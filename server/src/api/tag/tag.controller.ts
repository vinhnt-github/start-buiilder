import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TagService } from './tag.service';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  getAllTag() {
    return this.tagService.findAll();
  }
}
