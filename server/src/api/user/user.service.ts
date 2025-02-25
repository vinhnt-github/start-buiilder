import { DrizzleService } from '@/core/database/drizzle.service';
import { users } from '@/core/database/schema/user.schema';
import { Injectable } from '@nestjs/common';
import { and, like } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getAll(q) {
    const conditions: any[] = [];
    if (q.email) {
      conditions.push(like(users.email, `%${q.email}%`));
    }
    return this.drizzleService.db
      .select()
      .from(users)
      .where(and(...conditions));
  }

  async create(userDto: any) {
    return this.drizzleService.db
      .insert(users)
      .values({
        ...userDto,
      })
      .returning()
      .execute();
  }
}
