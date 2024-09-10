import { FlagSchema, PostStatus, PostType } from '@/core/database/schema/type';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const PostSchema = z.object({
  type: PostType,
  title: z.string(),
  emoji: z.string().optional(),
  bodyMarkdown: z.string(),
  status: PostStatus,
  pinned: z.boolean().optional(),
  deleteFlag: FlagSchema.optional(),
  tags: z.array(z.number()),
});

export class PostDto extends createZodDto(PostSchema) {}
