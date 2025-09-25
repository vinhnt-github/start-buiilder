import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const markdownPreviewSchema = z.object({
  markdownContent: z.string(),
});
export class MarkdownPreviewDto extends createZodDto(markdownPreviewSchema) {}
