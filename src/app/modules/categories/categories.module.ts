import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categoies.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  providers: [CategoriesResolver, CategoriesService],
  exports: []
})
export class CategoriesModule {}
