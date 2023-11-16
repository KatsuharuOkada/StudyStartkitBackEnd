import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../vendors/base/base.repository';
import { Category } from '../../entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends BaseRepository<Category> {}
