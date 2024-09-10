import { Module } from '@nestjs/common';
import { MarkdownModule } from '../markdown/markdown.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [MarkdownModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
