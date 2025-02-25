import { Controller, Get, Param } from '@nestjs/common';
import { ExploreService } from './explore.service';

@Controller('explore')
export class ExploreController {
  constructor(private readonly exploreService: ExploreService) {}

  @Get('/tag/:tagName')
  findArticleByTag(@Param('tagName') tagName: string) {
    return this.exploreService.getArticleByTag(tagName);
  }
}
