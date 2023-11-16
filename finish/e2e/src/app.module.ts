import { Logger, Module, OnModuleInit, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorMiddleware } from './vendors/middlewares/author.middleware';
import dbConfig from './configs/db/mySql';
import graphQLConfig from './configs/graphql/graphQL';
import { LoggerModule } from './common/logger/logger.module';
import { UsersModule } from './app/modules/users/users.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { CategoriesModule } from './app/modules/categories/categories.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    GraphQLModule.forRoot(graphQLConfig),
    AuthModule,
    UsersModule,
    CategoriesModule,
    LoggerModule
  ],
  controllers: [],
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
      .forRoutes({ path: '/graphql*', method: RequestMethod.ALL });
  }
}
