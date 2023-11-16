import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../../repositories/users.repository';
import { UsersService } from '../users/users.service';
import { CommentsEntity } from '../../entities/comments.entity';
import { CommentsRepository } from '../../repositories/comments.repository';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsEntity])],
  providers: [CommentsRepository, CommentsService, CommentsResolver, UsersService, UsersRepository],
  exports: [CommentsService],
})
export class CommentsModule {}
