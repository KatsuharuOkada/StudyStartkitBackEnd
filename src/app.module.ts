import './vendors/boilerplate.polyfill';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './configs/db/mySql';
import { DataSource } from 'typeorm';
import graphQLConfig from './configs/graphQL';
import { LoggerModule } from './common/logger/logger.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Logger } from './common/logger/logger';
import { PhotosModule } from './modules/photos/photos.module';
import { CommentsModule } from './modules/comments/comments.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ProjectsSkillsModule } from './modules/projects-skills/projects-skills.module';
import { GraphiQLExplorerModule } from './vendors/graphiql-explorer';
// Do not delete this comment
// Append new module in this place
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dbConfig;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid dataSource options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    /**
     * Config this to setup graphiQL.
     * Refer like this page: https://docs.github.com/en/graphql/overview/explorer
     * https://github.com/graphql/graphiql
     */
    GraphiQLExplorerModule.forRoot({
      paths: [
        {
          /**
           * Open explorer playground at link: $HOST/app
           */
          endpoint: '/graphql',
        },
        {
          /**
           * Open explorer playground at link: $HOST/admin
           */
          endpoint: '/admin',
        },
      ],
      /**
       * Default playground is $HOST/admin.
       * But sometime you want to config via proxy path. $HOST/ please switch 1.
       */
      isForwardPath: !!Number(process.env.PLAYGROUND_FORWARD_PATH),
      /**
       * If you want to off playground at production env. Please switch '1'
       */
      disabled: !!Number(process.env.PLAYGROUND_DISABLED),
    }),
    GraphQLModule.forRoot(graphQLConfig),
    AuthModule,
    UsersModule,
    LoggerModule,
    PhotosModule,
    CommentsModule,
    SkillsModule,
    ProjectsSkillsModule,
    // Do not delete this comment
    // Append moduleName in this place
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    await this.init();
  }
  async init() {
    new Logger().log(`${AppModule.name} init`);
  }
}
