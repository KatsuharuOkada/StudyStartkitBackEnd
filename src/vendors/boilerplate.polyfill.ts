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
  const { take, skip } = pager;
  this.skip(skip).take(take);
  const itemCount = await this.getCount();

  const { entities, raw } = await this.getRawAndEntities();

  const paging = new PagingDto(itemCount, pager, filters, orders);

  return [entities, paging];
};
