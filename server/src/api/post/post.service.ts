import { DrizzleService } from '@/core/database/drizzle.service';
import { posts } from '@/core/database/schema/post.schema';
import { tagToPost } from '@/core/database/schema/tagsToPosts.schema';
import { generateRandomString } from '@/core/utils/fns';
import { Injectable } from '@nestjs/common';
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

    //insert post
    const [{ postId }] = await this.drizzleService.db
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
      })
      .returning({ postId: posts.id });

    //insert post-to-tag
    if (tags && tags.length > 0) {
      this.drizzleService.db.insert(tagToPost).values(
        tags.map((tagId) => ({
          tagId,
          postId,
        })),
      );
    }
  }

  findAll() {
    return;
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
