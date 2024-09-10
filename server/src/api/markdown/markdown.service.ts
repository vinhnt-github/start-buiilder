import { Injectable } from '@nestjs/common';
const markdownit = require('markdown-it');

@Injectable()
export class MarkdownService {
  private readonly md: any;
  constructor() {
    this.md = markdownit({
      breaks: true,
    });
  }
  generate(markdownContent: string): string {
    const result = this.md.render(markdownContent);
    return result;
  }
}
