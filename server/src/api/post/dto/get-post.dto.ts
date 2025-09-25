import { PostStatusEnum, PostTypeEnum } from '@/core/database/schema/enum';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Pick only the fields we need for GET operations

export const GetPostSchema = z.object({
  q: z.string(),
  type: z.enum(PostTypeEnum.enumValues),
  status: z.enum(PostStatusEnum.enumValues),
  pinned: z.boolean().default(false),
  authorId: z.number(),
  page: z
    .string()
    .transform((val) => Number(val))
    .default('1'),
  pageSize: z
    .string()
    .transform((val) => Number(val))
    .default('10'),
  tagName: z.string(),
});

export class GetDto extends createZodDto(GetPostSchema.partial()) {}
