import { DrizzleService } from '@/core/database/drizzle.service';
import { users } from '@/core/database/schema/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async getAll() {
    return this.drizzleService.db.select().from(users);
  }

  async create(userDto: any) {
    return this.drizzleService.db
      .insert(users)
      .values({
        ...userDto,
      })
      .execute();
  }
}
