import { Logger, Module, OnModuleInit, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthorMiddleware } from './common/middlewares/author.middleware';
import { AppController } from './app.controller';
import graphQLConfig from './configs/api/graphQL'
import dbConfig from './configs/db/sql'
import { HomeController } from './app/controllers/home/home.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { BaseModule } from './common/module/base.module';
require('dotenv').config();

@Module({
  imports: [
    BaseModule,
    TypeOrmModule.forRoot(dbConfig),
    // GraphQLModule.forRoot(graphQLConfig)
  ],
  controllers: [AppController],
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
    // .forRoutes({ path: '/api*', method: RequestMethod.ALL });
  }
}
