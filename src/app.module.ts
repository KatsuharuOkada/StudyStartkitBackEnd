import { Module, OnModuleInit, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './configs/db/mySql';
import graphQLConfig from './configs/graphQL';
import { LoggerModule } from './common/logger/logger.module';
import { UsersModule } from './app/modules/users/users.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { CategoriesModule } from './app/modules/categories/categories.module';
import { Logger } from './common/logger/logger';
import { ConfigModule } from '@nestjs/config';
import { getMetadataArgsStorage } from 'typeorm';
import { AuthorMiddleware } from './common/middlewares/author.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    }),
    GraphQLModule.forRoot(graphQLConfig),
    AuthModule,
    UsersModule,
    CategoriesModule,
    LoggerModule,
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    await this.init();
  }
  async init() {
    new Logger().log(`${AppModule.name} init`);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorMiddleware)
      // .exclude({ path: '/', method: RequestMethod.GET })
      .forRoutes({ path: '/graphql*', method: RequestMethod.ALL });
  }
}
