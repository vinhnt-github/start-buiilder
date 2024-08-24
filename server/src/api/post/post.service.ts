import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  create(createPostDto: CreatePostDto) {
    throw new HttpException('some errors occurred!', 500);
  }

  findAll() {
    const article = Array.from({ length: 10 }).map((v, i) => ({
      id: i,
      slug: `slug-${i}`,
      title: `title-${i}`,
      article_type: 'blog',
      body_letters_count: '100',
      body_updated_at: new Date().toString(),
      comments_count: '10',
      emoji: '🤣',
      liked_count: '12',
      pinned: 'true',
      publication: 'PUBLIC',
      published_at: new Date().toString(),
      user: {},
      tag: [
        {
          id: i,
          name: `tag-${i}`,
          displayName: `tag ${i}`,
        },
      ],
    }));
    return article;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
