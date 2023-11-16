import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BaseResolver } from '../../../common/base/base.resolver';
import { CategoriesService } from './categoies.service';
import { CategoryDetail, CategoryInput, MutationResponse } from '../../graphql/graphql.schema';
import { UseFilters, HttpException, HttpStatus, UsePipes } from '@nestjs/common';
import { GraphQLException } from '../../../common/exceptions/graphql.exception';
@Resolver()
export class CategoriesResolver extends BaseResolver {
  constructor(private readonly categoryService: CategoriesService) {
    super();
  }
  @Mutation('createCategory')
  async createCategory(@Args('input') input: CategoryInput): Promise<MutationResponse> {
    try {
      await this.categoryService.create(input);
      return {
        statusCode: 200,
      };
    } catch (error) {
      throw error;
    }
  }
  @Query('getCategory')
  async get(@Args('categoryId') id: number): Promise<CategoryDetail> {
    try {
      const category = await this.categoryService.get(id);
      if (!category) {
        throw new GraphQLException(HttpStatus.NOT_FOUND);
      }
      return {
        id: category.categoryId,
        name: category.categoryName,
      };
    } catch (error) {
      throw error;
    }
  }
}
