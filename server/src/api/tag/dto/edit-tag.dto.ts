import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';

export const PutTagSchema = z.object({
  name: z.string(),
});

export class PutTagDto extends createZodDto(PutTagSchema) {}
