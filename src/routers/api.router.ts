import { Routes } from 'nest-router';
import { CategoryModule } from '../app/modules/categories/category.module';

const routes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/cate',
        module: CategoryModule
      }
    ]
  }
];
export default routes;
