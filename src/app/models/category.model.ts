import { Category } from '../entities/category.entity';
import { getRepository } from 'typeorm';
import { ModelBase } from '../../vendors/model/model.base';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryModel extends ModelBase {
  constructor() {
    super();
  }

  async getCategoryById(cateId: number): Promise<Category | undefined> {
    const cate = new Category();
    cate.category_id = cateId;
    return await getRepository(Category).findOne(cate);
  }

  async createCategory(cate: Category): Promise<boolean> {
    if (await getRepository(Category).save(cate)) {
      return true;
    }
    return false;
  }
}
