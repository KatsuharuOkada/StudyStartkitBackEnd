// Generated by trungbb@vitalify.asia

import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../vendors/base/base.repository';
// Do not delete this comment
// Append importEntity in this place
import { SkillsEntity } from '../entities/skills.entity';

@Injectable()
export class SkillsRepository extends BaseRepository<SkillsEntity> {
  constructor(private dataSource: DataSource) {
    super(SkillsEntity, dataSource.createEntityManager());
  }
}
