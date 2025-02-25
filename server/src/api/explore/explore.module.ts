import { Module } from '@nestjs/common';
import { PostModule } from '../post/post.module';
import { ExploreController } from './explore.controller';
import { ExploreService } from './explore.service';

@Module({
  imports: [PostModule],
  controllers: [ExploreController],
  providers: [ExploreService],
})
export class ExploreModule {}
