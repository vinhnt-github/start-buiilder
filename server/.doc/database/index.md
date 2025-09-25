# Drizzle Database Documentation

## Setup and Configuration

Our project uses Drizzle ORM with PostgreSQL. Configuration can be found in `drizzle.config.ts`.

### Scripts

- `npm run dbgenerate`: Generate migrations
- `npm run dbpush`: Push schema changes to database

## Schema Design

### Tables

```typescript
// Example table structure
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

## Migrations

### Creating Migrations

1. Make changes to schema files
2. Run `npm run dbgenerate`
3. Review generated migrations in `drizzle` folder
4. Apply with `npm run dbpush`

### Migration Files Location

Migrations are stored in: `/drizzle`

## Common Operations

### Querying

```typescript
// Select all
const allUsers = await db.select().from(users);

// Select with conditions
const user = await db.select().from(users).where(eq(users.id, 1));

// Insert
const newUser = await db.insert(users).values({ name: 'John' }).returning();

// Update
const updated = await db
  .update(users)
  .set({ name: 'Jane' })
  .where(eq(users.id, 1))
  .returning();

// Delete
const deleted = await db.delete(users).where(eq(users.id, 1)).returning();
```

### Relations

```typescript
// Example of table relations
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
});

// Query with relations
const usersWithPosts = await db
  .select()
  .from(users)
  .leftJoin(posts, eq(users.id, posts.userId));
```

## Best Practices

1. Always use migrations for schema changes
2. Use TypeScript for type safety
3. Implement validation using drizzle-zod
4. Keep schema files organized by feature
5. Add comments for complex queries

## Troubleshooting

Common issues and solutions:

1. Migration conflicts:

   - Drop database and recreate
   - Delete migration files and regenerate

2. Type errors:
   - Ensure schema types are properly imported
   - Regenerate types after schema changes

## Resources

- [Drizzle Documentation](https://orm.drizzle.team)
- [DrizzleKit CLI Reference](https://orm.drizzle.team/kit-docs/overview)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
