import { Repository, DataSource } from 'typeorm';
import { CommentsEntity } from '../entities/comments.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsRepository extends Repository<CommentsEntity> {
  constructor(private dataSource: DataSource) {
    super(CommentsEntity, dataSource.createEntityManager());
  }
}
