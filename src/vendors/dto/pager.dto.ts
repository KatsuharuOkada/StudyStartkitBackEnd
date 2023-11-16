export class PagerDto {
  limit: number;
  offset?: number;
  page?: number;
  isTakeAll?: boolean;
}

export class PagingDto {
  limit: number;
  offset: number;
  page: number;
  totalCount: number;
  isNext: boolean;
  isPrev: boolean;
  filters: any;
  orders: any;
  constructor(totalCount: number, pager: PagerDto, filters?: any, orders?: any) {
    this.offset = pager.offset;
    this.limit = pager.limit;
    this.page = pager.page;
    this.totalCount = totalCount;
    this.isNext = pager.page * pager.limit < this.totalCount;
    this.isPrev = pager.page > 1;
    this.filters = filters || null;
    this.orders = orders || null;
  }
}

export class PageDto<T> {
  readonly data: T[];

  readonly paging: PagingDto;

  constructor(data: T[], paging: PagingDto) {
    this.data = data;
    this.paging = paging;
  }
}
