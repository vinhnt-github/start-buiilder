import { PageOptionsDto } from './page-option.dto';

export interface PageMetaDtoParameters {
  pageOptionDto: PageOptionsDto;
  itemCount: number;
}

export class PageMetaDto {
  readonly page: number;
  readonly pageSize: number;
  readonly itemCount: number;
  readonly totalPage: number;
  readonly hasNextPage: boolean;
  constructor({ pageOptionDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionDto.page || 1;
    this.pageSize = pageOptionDto.pageSize || 10;
    this.itemCount = itemCount;
    this.totalPage = Math.ceil(this.itemCount / this.pageSize);
    this.hasNextPage = this.page < this.totalPage;
  }
}
