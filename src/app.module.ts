import { Logger, Module, OnModuleInit, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorMiddleware } from './vendors/middlewares/author.middleware';
import { UsersModule } from './app/modules/users/users.module';
import { AppController } from './app.controller';
import dbConfig from './configs/db/mySql';
import graphQLConfig from './configs/api/graphQL';
import { CategoryModule } from './app/modules/categories/category.module';
import { RouterModule } from 'nest-router';
import apiRouter from './routers/api.router';
import { LoggerModule } from './common/logger/logger.module';
import { CategoryController } from './app/modules/categories/category.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    GraphQLModule.forRoot(graphQLConfig),
    RouterModule.forRoutes(apiRouter),
    UsersModule,
    CategoryModule,
    LoggerModule
  ],
  controllers: [AppController, CategoryController],
  providers: []
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    await this.init();
  }

  async init() {
    new Logger(AppModule.name).log('init');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorMiddleware)
      .exclude({ path: '/', method: RequestMethod.GET })
      .forRoutes({ path: '/api*', method: RequestMethod.ALL });
  }
}
