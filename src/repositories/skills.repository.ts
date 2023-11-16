import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SkillsEntity } from '../entities/skills.entity';

@Injectable()
export class SkillsRepository extends Repository<SkillsEntity> {
  constructor(private dataSource: DataSource) {
    super(SkillsEntity, dataSource.createEntityManager());
  }
}
