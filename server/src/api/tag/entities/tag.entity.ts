import { tags } from '@/core/database/schema';

export type TagSelect = typeof tags.tags.$inferSelect;
export type TagInsert = typeof tags.tags.$inferInsert;
