import { Request } from 'express';
import { Controller, Get, Post, Req, Param } from '@nestjs/common';
import { BaseController } from '../../../vendors/controller/BaseController';
import { CategoryModel } from '../../../app/models/category.model';
import { Category } from '../../../app/entities/category.entity';
import { Logger } from '../../../common/logger/logger';

@Controller('category')
export class CategoryController extends BaseController {
  categoryModel: CategoryModel;
  constructor(private logger: Logger) {
    super();
    this.categoryModel = new CategoryModel();
  }

  @Get(':cateId')
  public async getCategoryById(@Req() request: Request, @Param() params): Promise<Category> {
    this.logger.log('into get category');
    return await this.categoryModel.getCategoryById(params.cateId);
  }

  @Post()
  public async createCategoryById(@Req() request: Request, @Param() params): Promise<Category> {
    return await this.categoryModel.getCategoryById(params.cateId);
  }
}
