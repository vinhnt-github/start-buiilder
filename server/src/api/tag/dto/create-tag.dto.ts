import { FlagSchema } from '@/core/database/schema/type';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PostTagSchema = z.object({
  name: z.string(),
  displayName: z.string(),
  color: z.string(),
  flag: FlagSchema,
  image: z.string().optional(),
});

export class PostTagDto extends createZodDto(PostTagSchema) {}
