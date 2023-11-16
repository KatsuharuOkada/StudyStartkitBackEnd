import { Repository, DataSource } from 'typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsRepository extends Repository<ProjectsEntity> {
  constructor(private dataSource: DataSource) {
    super(ProjectsEntity, dataSource.createEntityManager());
  }
}
