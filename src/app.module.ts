import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/modules/booking/auth/auth.module';
import { CategoriesModule } from './app/modules/booking/categories/categories.module';
import { UsersModule } from './app/modules/booking/users/users.module';
import { LoggerModule } from './common/logger/logger.module';
import * as configs from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: Object.values(configs) }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config = configService.get('graphQL_booking');
        return {
          ...config,
          include: [AuthModule, UsersModule, CategoriesModule],
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('graphQL_stamp'),
      inject: [ConfigService],
    }),
    LoggerModule,
  ],
})
export class AppModule {}
