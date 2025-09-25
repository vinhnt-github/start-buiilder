import { PageDto } from '@/core/utils/paginator/page.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MarkdownPreviewDto } from './dto/create-markdown.dto';
import { MarkdownService } from './markdown.service';

@Controller('markdown')
export class MarkdownController {
  constructor(private readonly markdownService: MarkdownService) {}
  @Get()
  helloMarkdown() {
    return {
      success: true,
    };
  }

  @Post('preview')
  create(@Body() markdownDto: MarkdownPreviewDto) {
    try {
      const result = this.markdownService.generate(markdownDto.markdownContent);
      return PageDto.success(result);
    } catch (error) {
      return PageDto.error('Invalid markdown content');
    }
  }
}
