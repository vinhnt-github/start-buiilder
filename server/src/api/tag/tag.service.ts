import { DrizzleService } from '@/core/database/drizzle.service';
import { tags as tagSchema } from '@/core/database/schema/tag.schema';
import { Injectable } from '@nestjs/common';
import { PostTagDto } from './dto/create-tag.dto';
import { TagSelect } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(private readonly drizzleService: DrizzleService) {}
  async findAll(): Promise<TagSelect[]> {
    const tags = await this.drizzleService.db
      .select()
      .from(tagSchema)
      .execute();
    return tags;
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
