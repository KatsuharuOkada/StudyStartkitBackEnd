import 'source-map-support/register';
import { compact, map } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import { AbstractDto } from './base/abstract.dto';
import { AbstractEntity } from './base/abstract.entity';
import { PagerDto, PagingDto, PageDto } from './dto/pager.dto';

declare global {
  interface Array<T> {
    toDtos<Dto extends AbstractDto>(this: T[], options?: any): Dto[];
    toPageDto<Dto extends AbstractDto>(this: T[], pager: PagingDto, filters?: any, orders?: any): PageDto<Dto>;
  }
}

declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    paginate(
      this: SelectQueryBuilder<Entity>,
      pager: PagerDto,
      filters?: any,
      orders?: any
    ): Promise<[Entity[], PagingDto]>;
  }
}

Array.prototype.toDtos = function <Entity extends AbstractEntity<Dto>, Dto extends AbstractDto>(options?: any): Dto[] {
  return compact(map<Entity, Dto>(this, (item) => item.toDto(options as never)));
};

Array.prototype.toPageDto = function (PagingDto: PagingDto, options?: any) {
  return new PageDto(this.toDtos(options), PagingDto);
};

SelectQueryBuilder.prototype.paginate = async function (pager: PagerDto, filters?: any, orders?: any) {
  let limit = 10;
  let offset = 0;
  let page = 1;
  if (pager.offset >= 0) {
    limit = pager.limit;
    offset = pager.offset;
    page = Math.ceil(offset / limit + 1);
  } else if (pager.page >= 1) {
    limit = pager.limit;
    offset = pager.limit * (pager.page - 1);
    page = pager.page;
  }
  pager.offset = offset;
  pager.page = page;
  this.skip(offset).take(limit);
  const itemCount = await this.getCount();
  const { entities, raw } = await this.getRawAndEntities();
  const paging = new PagingDto(itemCount, pager, filters, orders);
  return [entities, paging];
};
