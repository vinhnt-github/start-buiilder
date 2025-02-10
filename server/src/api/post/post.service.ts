import { DrizzleService } from '@/core/database/drizzle.service';
import { posts } from '@/core/database/schema/post.schema';
import { tagToPost } from '@/core/database/schema/tagsToPosts.schema';
import { PostStatus } from '@/core/database/schema/type';
import { generateRandomString } from '@/core/utils/fns';
import { HttpException, Injectable } from '@nestjs/common';
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
    // const queryBuilder = this.drizzleService.db
    //   .select({
    //     id: posts.id,
    //     type: posts.type,
    //     title: posts.title,
    //     emoji: posts.emoji,
    //     bodyMarkdown: posts.bodyMarkdown,
    //     bodyHtml: posts.bodyHtml,
    //     slug: posts.slug,
    //     status: posts.status,
    //     pinned: posts.pinned,
    //     createdBy: {
    //       id: users.id,
    //       email: users.email,
    //       username: users.username,
    //       avatar: users.avatar,
    //     },
    //   })
    //   .from(posts)
    //   .innerJoin(users, eq(posts.createdBy, users.id))
    //   .innerJoin(tagToPost, eq(posts.id, tagToPost.postId))
    //   .innerJoin(tags, eq(tagToPost.tagId, tags.id))
    //   .$dynamic();
    // if (q) {
    //   queryBuilder.where(ilike(posts.title, `%${q}%`));
    // }

    // if (author) {
    //   queryBuilder.where(eq(posts.authorId, author));
    // }

    // if (tagName) {
    //   queryBuilder.where(eq(posts.authorId, author));
    // }
    // queryWithPagination(queryBuilder, page, pageSize);

    // const articles = await queryBuilder.execute();
    const articles = await this.drizzleService.db.query.posts.findMany({
      with: {
        tagsToPosts: {
          with: {
            tags: true,
          },
        },
      },
    });

    return {
      articles,
      page,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
