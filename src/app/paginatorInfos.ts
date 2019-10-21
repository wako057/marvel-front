
export class PaginatorInfos {
  offset: number;
  limit: number;
  total: number;
  count: number;
  pageIndex: number;

  constructor(offset: number, limit: number, total: number, count: number, pageIndex = null) {
    this.offset = offset;
    this.limit = limit;
    this.total = total;
    this.count = count;
    this.pageIndex = pageIndex;
  }
}
