import './vendors/boilerplate.polyfill';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './configs/db/mySql';
import dataSource from '../typeOrm.config';
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
// Do not delete this comment
// Append new module in this place
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dbConfig;
      },
      async dataSourceFactory() {
        if (!dataSource) {
          throw new Error('Invalid dataSource options passed');
        }
        return addTransactionalDataSource(dataSource);
      },
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
