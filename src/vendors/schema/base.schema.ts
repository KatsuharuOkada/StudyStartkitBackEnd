export class Pager {
  limit: number;
  offset: number;
}

export interface PagerInformation {
  limit: number;
  offset: number;
  currentPageNum: number;
  totalCount: number;
  hasPrev: boolean;
  hasNext: boolean;
  prevPageNum: number;
  nextPageNum: number;
  lastPageNum: number;
}
