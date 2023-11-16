import { Repository, DataSource } from 'typeorm';
import { ProjectsSkillsEntity } from '../entities/projects_skills.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsSkillsRepository extends Repository<ProjectsSkillsEntity> {
  constructor(private dataSource: DataSource) {
    super(ProjectsSkillsEntity, dataSource.createEntityManager());
  }
}
