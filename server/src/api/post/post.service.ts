import { DrizzleService } from '@/core/database/drizzle.service';
import { posts } from '@/core/database/schema/post.schema';
import { tags } from '@/core/database/schema/tag.schema';
import { tagToPost } from '@/core/database/schema/tagsToPosts.schema';
import { PostStatus } from '@/core/database/schema/type';
import { users } from '@/core/database/schema/user.schema';
import { generateRandomString } from '@/core/utils/fns';
import { queryWithPagination } from '@/core/utils/with-pagination';
import { HttpException, Injectable } from '@nestjs/common';
import { eq, ilike, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { MarkdownService } from '../markdown/markdown.service';
import { UpdatePostDto } from './dto/update-post.dto';

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
    return title;
  }

  async create(userId, { tags, ...newPost }) {
    const path = this.convertTitleToPath(newPost.title);
    const bodyHtml = this.markdownService.generate(newPost.bodyMarkdown);
    const slug = generateRandomString(12);

    if (newPost.status === PostStatus.Enum.PUBLISHED) {
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
        if (tags && tags.length > 0) {
          await tx.insert(tagToPost).values(
            tags.map((tagId) => ({
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

  async findAll(query) {
    const { q, author, page = 1, pageSize = 10, tag, tagName } = query;
    const queryBuilder = this.drizzleService.db
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
        tags: sql`array_agg(json_build_object('id', tags.id,'name', tags.name, 'displayName', tags.display_name))`.as(
          'tags',
        ),
      })
      .from(posts)
      .innerJoin(users, eq(posts.createdBy, users.id))
      .innerJoin(tagToPost, eq(posts.id, tagToPost.postId))
      .innerJoin(tags, eq(tagToPost.tagId, tags.id))
      .groupBy(posts.id, users.id)
      .$dynamic();
    if (q) {
      queryBuilder.where(ilike(posts.title, `%${q}%`));
    }

    if (author) {
      queryBuilder.where(eq(posts.authorId, author));
    }

    if (tagName) {
      queryBuilder.where(eq(tags.name, tagName));
    }

    queryWithPagination(queryBuilder, page, pageSize);

    const articles = await queryBuilder.execute();

    return articles;
  }

  async findOneBySlug(slug: string) {
    const post = await this.drizzleService.db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .execute();
    return post[0];
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
