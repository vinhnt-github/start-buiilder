import { DrizzleService } from '@/core/database/drizzle.service';
import { tags as tagSchema } from '@/core/database/schema/tag.schema';
import { PageDto } from '@/core/utils/paginator/page.dto';
import { Injectable } from '@nestjs/common';
import { PostTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly drizzleService: DrizzleService) {}
  async findAll() {
    const tags = await this.drizzleService.db
      .select()
      .from(tagSchema)
      .execute();
    return PageDto.success(tags);
  }

  async create(userId: number, tag: PostTagDto) {
    await this.drizzleService.db.insert(tagSchema).values({
      name: tag.name,
      displayName: tag.displayName,
      color: tag.color,
      createdBy: userId,
      updatedBy: userId,
    });
  }
  async edit(userId: number, tagId: number, tag) {
    await this.drizzleService.db.insert(tagSchema).values({
      name: tag.name,
      displayName: tag.displayName,
      color: tag.color,
      createdBy: userId,
      updatedBy: userId,
    });
  }
}
