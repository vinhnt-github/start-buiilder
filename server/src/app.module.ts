import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './api/tag/tag.module';
import { PostModule } from './api/post/post.module';

@Module({
  imports: [TagModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
