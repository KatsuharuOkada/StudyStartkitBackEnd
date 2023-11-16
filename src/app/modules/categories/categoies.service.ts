import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { Category } from '../../entities/category.entity';
import { CategoryInput } from '../../graphql/graphql.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: CategoryRepository
  ) {}

  get(id: number) {
    return this.categoriesRepository.findOne({
      where: {
        categoryId: id,
      },
    });
  }
  create(input: CategoryInput) {
    return this.categoriesRepository.insert(input);
  }
}
