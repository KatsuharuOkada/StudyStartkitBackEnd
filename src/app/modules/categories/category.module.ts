import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { CategoryModel } from '../../../app/models/category.model';
import { CategoryController } from './category.controller';
import { LoggerModule } from '../../../common/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), LoggerModule],
  providers: [CategoryModel],
  controllers: [CategoryController]
})
export class CategoryModule {}
