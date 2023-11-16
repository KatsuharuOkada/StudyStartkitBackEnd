import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../../entities/users.entity';
import _ = require('lodash');
import { UsersService } from '../users/users.service';
import { CommentsRepository } from '../../repositories/comments.repository';
import { CommentsEntity } from '../../entities/comments.entity';

@Injectable()
export class CommentsService {
  private entityAlias: string;
  private userAlias: string;
  constructor(private commentRepository: CommentsRepository, private userService: UsersService) {
    this.entityAlias = CommentsEntity.name;
    this.userAlias = UsersEntity.name;
  }
}
