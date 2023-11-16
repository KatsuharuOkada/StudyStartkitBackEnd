import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DoctorsEntity } from '../entities/doctors.entity';

@Injectable()
export class DoctorsRepository extends Repository<DoctorsEntity> {
  constructor(private dataSource: DataSource) {
    super(DoctorsEntity, dataSource.createEntityManager());
  }
}
