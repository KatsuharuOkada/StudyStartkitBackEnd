export class PagerDto {
  take: number;
  skip: number;
  isTakeAll?: boolean;
}

export class PagingDto {
  take: number;
  skip: number;
  total: number;
  isNext: boolean;
  isPrev: boolean;
  filters: any;
  orders: any;
  constructor(total: number, pager: PagerDto, filters?: any, orders?: any) {
    this.skip = pager.skip;
    this.take = pager.take;
    this.total = total;
    this.isNext = pager.skip + 1 < this.total;
    this.isPrev = pager.skip > 0;
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
