import { Injectable } from '@nestjs/common';
import { PostService } from '../post/post.service';

@Injectable()
export class ExploreService {
  constructor(private readonly postService: PostService) {}
  getArticleByTag(tagName: string) {
    return this.postService.findAll({ tagName: tagName });
  }
}
