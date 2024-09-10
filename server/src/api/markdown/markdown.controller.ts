import { Body, Controller, Get, Post } from '@nestjs/common';
import { MarkdownDto } from './dto/create-markdown.dto';
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
  create(@Body() markdownDto: MarkdownDto) {
    return this.markdownService.generate(markdownDto.markdownContent);
  }
}
