import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../../entities/users.entity';
import { UsersRepository } from '../../repositories/users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersRepository, UsersService, UsersResolver],
  exports: [UsersModule, UsersService],
})
export class UsersModule {}
