import { IsPublic } from '@/core/decorator/public.decorator';
import { RequestUser } from '@/core/decorator/request-user.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { PostTagDto } from './dto/create-tag.dto';
import { PutTagDto } from './dto/edit-tag.dto';
import { TagService } from './tag.service';

@IsPublic()
@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  getAllTag() {
    return this.tagService.findAll();
  }

  @Post()
  createPost(@RequestUser() userId: number, @Body() tag: PostTagDto) {
    return this.tagService.create(userId, tag);
  }

  @Put(':id')
  editPost(
    @RequestUser() userId: number,
    @Param() tagId: string,
    @Body() tag: PutTagDto,
  ) {
    return this.tagService.edit(userId, +tagId, tag);
  }
}
