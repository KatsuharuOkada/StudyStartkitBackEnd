import { Repository, DataSource } from 'typeorm';
import { ResetPasswordHistoriesEntity } from '../entities/reset-password-histories.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResetPasswordHistoriesRepository extends Repository<ResetPasswordHistoriesEntity> {
  constructor(private dataSource: DataSource) {
    super(ResetPasswordHistoriesEntity, dataSource.createEntityManager());
  }
}
