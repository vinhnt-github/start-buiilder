import { PgSelect } from 'drizzle-orm/pg-core';

export const queryWithPagination = <T extends PgSelect>(
  qb: T,
  page: number,
  pageSize: number,
): T => {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
};
