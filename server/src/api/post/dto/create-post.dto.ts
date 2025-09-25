import { FlagSchema, PostStatus, PostType } from '@/core/database/schema/type';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PostSchema = z.object({
  type: PostType.optional(),
  title: z.string(),
  emoji: z.string().optional(),
  bodyMarkdown: z.string(),
  status: PostStatus,
  pinned: z.boolean().optional(),
  deleteFlag: FlagSchema.optional(),
  tags: z.string().optional(),
});

export class PostDto extends createZodDto(PostSchema) {}
