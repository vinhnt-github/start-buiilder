export enum POST_STATUS {
  INIT = 'INIT',
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  DELETED = 'DELETED',
}

export interface PaginationResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
