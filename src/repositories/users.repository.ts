import { Repository, DataSource } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }
}
