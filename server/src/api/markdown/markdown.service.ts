import { Injectable } from '@nestjs/common';
const markdownit = require('markdown-it');
const highlightjs = require('markdown-it-highlightjs');

@Injectable()
export class MarkdownService {
  private readonly md: any;
  constructor() {
    this.md = markdownit({
      breaks: true,
      highlight: true,
    }).use(highlightjs, {
      inline: true,
      auto: true,
    });
  }
  generate(markdownContent: string): string {
    try {
      const result = this.md.render(markdownContent);
      return result;
    } catch (error) {
      console.error('Error generating markdown:', error);
      throw new Error('Failed to generate markdown');
    }
  }
}
