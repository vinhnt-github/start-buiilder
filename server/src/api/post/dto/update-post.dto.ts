import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { PostSchema } from './create-post.dto';

const UpdatePostSchema = PostSchema.extend({
  slug: z.string(),
});

export class UpdatePostDto extends createZodDto(UpdatePostSchema) {}
