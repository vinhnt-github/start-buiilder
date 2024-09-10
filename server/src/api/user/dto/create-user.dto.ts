import { users } from '@/core/database/schema/user.schema';
import { createInsertSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';

export const PostUserSchema = createInsertSchema(users, {
  email: (schema) =>
    schema.email.email({
      message: 'Email is not valid!!',
    }),
});

export class PostUserDto extends createZodDto(PostUserSchema) {}
