import { IsPublic } from '@/core/decorator/public.decorator';
import { RequestUser } from '@/core/decorator/request-user.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @IsPublic()
  @Get()
  findAll(@Query() query: any) {
    return this.postService.findAll(query);
  }

  @Post('new')
  create(@RequestUser() userId: number, @Body() createPostDto: PostDto) {
    return this.postService.create(userId, createPostDto);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.postService.findOneBySlug(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
