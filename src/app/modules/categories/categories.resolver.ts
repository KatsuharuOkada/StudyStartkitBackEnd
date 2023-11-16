import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BaseResolver } from '../../../vendors/base/base.resolver';
import { CategoriesService } from './categoies.service';
import {
  CategoryResponse,
  CategoryInput,
  MutationResponse,
} from '../../graphql/graphql.schema';
import {
  UseFilters,
  HttpException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../../vendors/filters/http-exception.filter';
import { JoiValidationPipe } from '../../../vendors/pipes/joiValidation.pipe';
import * as joi from 'joi';
@Resolver()
@UseFilters(new HttpExceptionFilter())
export class CategoriesResolver extends BaseResolver {
  constructor(private readonly categoryService: CategoriesService) {
    super();
  }
  @UsePipes(
    new JoiValidationPipe<CategoryInput>({
      categoryName: joi.string().min(1).max(255),
    })
  )
  @Mutation('createCategory')
  async createCategory(
    @Args('input') input: CategoryInput
  ): Promise<MutationResponse> {
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
  async get(@Args('categoryId') id: number): Promise<CategoryResponse> {
    try {
      const category = await this.categoryService.get(id);
      if (!category) {
        throw new HttpException(
          {
            errorCode: 'NOT_FOUND',
            message: 'Data not found',
            details: [],
          },
          HttpStatus.NOT_FOUND
        );
      }
      return this.response(category);
    } catch (error) {
      throw error;
    }
  }
}
