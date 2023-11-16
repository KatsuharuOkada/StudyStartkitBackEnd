import { Module } from '@nestjs/common';
import { UsersModel } from '../../models/users.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersModel, UsersResolver]
})
export class UsersModule {}
