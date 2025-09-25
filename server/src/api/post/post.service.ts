import { DrizzleService } from '@/core/database/drizzle.service';
import { FlagEnum } from '@/core/database/schema/enum';
import { posts } from '@/core/database/schema/post.schema';
import { tags } from '@/core/database/schema/tag.schema';
import { tagToPost } from '@/core/database/schema/tagsToPosts.schema';
import { PostStatus } from '@/core/database/schema/type';
import { users } from '@/core/database/schema/user.schema';
import { generateRandomString } from '@/core/utils/fns';
import { PageDto } from '@/core/utils/paginator/page.dto';
import { queryWithPagination } from '@/core/utils/with-pagination';
import { HttpException, Injectable } from '@nestjs/common';
import { and, asc, count, eq, isNull, ne, or, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { MarkdownService } from '../markdown/markdown.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchConditionBuilder } from './utils/searchConditionBuilder';

@Injectable()
export class PostService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly markdownService: MarkdownService,
  ) {}

  private convertTitleToPath(title: string): string {
    return slugify(title, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      lower: true, // convert to lower case, defaults to `false`
      locale: 'vi', // language code of the locale to use
    });
  }

  private buildBasePostQuery() {
    return this.drizzleService.db
      .select({
        id: posts.id,
        type: posts.type,
        title: posts.title,
        emoji: posts.emoji,
        bodyMarkdown: posts.bodyMarkdown,
        bodyHtml: posts.bodyHtml,
        slug: posts.slug,
        status: posts.status,
        pinned: posts.pinned,
        publishedAt: posts.publishedAt,
        createdBy: {
          id: users.id,
          email: users.email,
          username: users.username,
          avatar: users.avatar,
        },
        tags: sql`COALESCE(array_agg(
                  CASE 
                    WHEN tags.id IS NOT NULL 
                    THEN json_build_object('id', tags.id, 'name', tags.name, 'displayName', tags.display_name)
                    ELSE NULL 
                  END
                ) FILTER (WHERE tags.id IS NOT NULL), '{}')`.as('tags'),
      })
      .from(posts)
      .innerJoin(users, eq(posts.createdBy, users.id))
      .leftJoin(tagToPost, eq(posts.id, tagToPost.postId))
      .leftJoin(tags, eq(tagToPost.tagId, tags.id))
      .groupBy(posts.id, users.id);
  }

  private searchPostConditionsBuilder(query, intialCondition?) {
    return new SearchConditionBuilder(intialCondition)
      .addTitleSearch(query.q)
      .addAuthorFilter(query.author)
      .addTagFilter(query.tagName)
      .build();
  }
  private count = (conditions) => {
    return this.drizzleService.db
      .select({ count: count() })
      .from(posts)
      .where(conditions)
      .execute();
  };

  /**
   * Create a new post
   * @param userId {string} ID of the user creating the post
   * @param newPost {object} Post data
   * @param newPost.title {string} Title of the post
   * @param newPost.bodyMarkdown {string} Post content in markdown format
   * @param newPost.status {PostStatus} Post status (DRAFT/PUBLISHED)
   * @param newPost.tags {string} Comma-separated list of tag IDs
   * @returns {Promise<{success: boolean}>} Result of the creation operation
   */

  async create(userId, { ...newPost }) {
    const path = this.convertTitleToPath(newPost.title);
    const bodyHtml = this.markdownService.generate(newPost.bodyMarkdown);
    const slug = generateRandomString(12);

    if (newPost.status === PostStatus.Enum.PUBLISHED) {
      // TODO
    }

    return await this.drizzleService.db.transaction(async (tx) => {
      try {
        //insert post
        const [{ postId }] = await tx
          .insert(posts)
          .values({
            title: newPost.title,
            bodyMarkdown: newPost.bodyMarkdown,
            bodyHtml,
            slug,
            path,
            status: newPost.status,
            authorId: userId,
            createdBy: userId,
            updatedBy: userId,
            publishedAt:
              newPost.status === PostStatus.Enum.PUBLISHED ? new Date() : null,
          })
          .returning({ postId: posts.id });

        // insert post-to-tag
        if (newPost.tags && newPost.tags.length > 0) {
          await tx.insert(tagToPost).values(
            newPost.tags.split(',').map((tagId) => ({
              tagId,
              postId,
            })),
          );
        }
        return {
          success: true,
        };
      } catch (error) {
        throw new HttpException((error as any).name, 400, { cause: error });
      }
    });
  }

  async update(id: number, { tags, ...postData }: UpdatePostDto) {
    try {
      const exitsPost = await this.drizzleService.db.query.posts
        .findFirst({
          where: eq(posts.id, id),
          orderBy: [asc(posts.createdAt)],
        })
        .execute();
      if (!exitsPost) {
        throw new HttpException('Post not found', 404);
      }

      const bodyHtml = this.markdownService.generate(postData.bodyMarkdown);
      const path = this.convertTitleToPath(postData.title);
      const data: any = {
        ...postData,
        bodyHtml,
        path,
      };
      if (
        exitsPost.status === PostStatus.Enum.DRAFT &&
        postData.status === PostStatus.Enum.PUBLISHED
      ) {
        data.publishedAt = new Date();
      }

      this.drizzleService.db.transaction(async (tx) => {
        // Update post
        await tx.update(posts).set(data).where(eq(posts.id, id)).execute();
        // Update tags
        if (tags && tags.length > 0) {
          // Delete existing tags
          await tx.delete(tagToPost).where(eq(tagToPost.postId, id)).execute();
          // Insert new tags
          await tx.insert(tagToPost).values(
            tags.split(',').map((tagId) => ({
              tagId: Number(tagId),
              postId: id,
            })),
          );
        }
        return {
          success: true,
        };
      });
    } catch (error) {
      throw new HttpException((error as any).message, (error as any).status, {
        cause: error,
      });
    }
  }

  async updatePostBySlug(slug: string, postData: UpdatePostDto) {
    try {
      const { data: exitsPost } = await this.findOneBySlug(slug);
      if (!exitsPost) {
        throw new HttpException('Post not found', 404);
      }
      return this.update(exitsPost.id, {
        ...postData,
      });
    } catch (error) {
      throw new HttpException((error as any).message, (error as any).status, {
        cause: error,
      });
    }
  }

  /**
   * Find all posts with pagination and filtering
   * @param query {object} Query parameters
   * @param query.q {string} Search query for post title
   * @param query.author {string} Filter posts by author ID
   * @param query.page {number} Page number (default: 1)
   * @param query.pageSize {number} Number of items per page (default: 10)
   * @param query.tag {string} Filter posts by tag ID
   * @param query.tagName {string} Filter posts by tag name
   * @returns Array of posts with author and tags information
   */
  async findAllPublicPost(query) {
    // Arrange
    const {
      page = 1,
      pageSize = 10,
      status = PostStatus.Values.PUBLISHED,
    } = query;

    const queryBuilder = this.buildBasePostQuery().$dynamic();
    const whereCondition = this.searchPostConditionsBuilder(query, [
      and(
        or(
          ne(posts.deleteFlag, FlagEnum.enumValues[0]),
          isNull(posts.deleteFlag),
        ),
        eq(posts.status, status),
      ),
    ]);

    queryBuilder.where(whereCondition);

    const queryBuilderWithPagination = queryWithPagination(
      queryBuilder,
      page,
      pageSize,
    );

    // Act
    const articles = await queryBuilderWithPagination.execute();
    const [{ count: total }] = await this.count(whereCondition);
    return PageDto.paginate(articles, {
      pageOptionDto: {
        page,
        pageSize,
      },
      itemCount: total,
    });
  }

  async findOneBySlug(slug: string) {
    const post = await this.buildBasePostQuery()
      .where(eq(posts.slug, slug))
      .execute();

    return {
      data: post[0],
    };
  }

  async remove(id: number) {
    try {
      const result = await this.drizzleService.db
        .update(posts)
        .set({
          deleteFlag: FlagEnum.enumValues[0],
        })
        .where(eq(posts.id, id))
        .execute();

      // Check rowCount instead of length
      if (result.rowCount === 0) {
        throw new HttpException('Post not found', 404);
      }

      return {
        success: true,
        message: `Post ${id} deleted successfully`,
      };
    } catch (error) {
      throw new HttpException((error as any).message, (error as any).status, {
        cause: error,
      });
    }
  }
}
