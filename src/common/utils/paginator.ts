import { PagerInformation } from '../../vendors/schema/base.schema';
import { getRepository } from 'typeorm';

export async function paginate(
  object: any,
  condition: string,
  limit: number,
  offset: number
): Promise<PagerInformation | undefined> {
  let pager: any;
  const totalCount = await getRepository(object)
    .createQueryBuilder('page')
    .where(condition)
    .getCount();
  const totalPage = Math.ceil(totalCount / limit);
  const currentPageNum = offset <= totalPage ? offset : totalPage;
  const hasPrev = currentPageNum > 1;
  const hasNext = currentPageNum < totalPage;
  offset = currentPageNum > 0 ? (currentPageNum - 1) * limit : 0;
  pager = {
    limit,
    offset,
    currentPageNum,
    totalCount,
    hasPrev,
    hasNext,
    prevPageNum: hasPrev ? currentPageNum - 1 : undefined,
    nextPageNum: hasNext ? currentPageNum + 1 : undefined,
    lastPageNum: totalPage,
  };
  return pager;
}
