import { PageMetaDto, PageMetaDtoParameters } from './page-meta.dto';

export interface BaseApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginatedApiResponse<T> extends BaseApiResponse<T[]> {
  meta: {
    page: number;
    pageSize: number;
    itemCount: number;
    totalPage: number;
    hasNextPage: boolean;
  };
}

export class PageDto<T> {
  readonly data: T;
  readonly meta: PageMetaDto;
  constructor(data: T, meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
  static success<T>(data: T, message?: string): BaseApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message: string): BaseApiResponse<null> {
    return {
      success: false,
      message,
      data: null,
    };
  }

  static paginate<T>(
    data: T[],
    pageMetaParams: PageMetaDtoParameters,
    message?: string,
  ): PaginatedApiResponse<T> {
    const meta = new PageMetaDto(pageMetaParams);

    return {
      success: true,
      message,
      data,
      meta,
    };
  }
}
