import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AdminsEntity } from '../entities/admins.entity';

@Injectable()
export class AdminsRepository extends Repository<AdminsEntity> {
  constructor(private dataSource: DataSource) {
    super(AdminsEntity, dataSource.createEntityManager());
  }
}
