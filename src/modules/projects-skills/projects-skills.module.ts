// Generated by ThanhLD

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsSkillsEntity } from '../../entities/projects_skills.entity';
import { SkillsRepository } from '../../repositories/skills.repository';
import { ProjectsSkillsResolver } from './projects-skills.resolver';
import { ProjectsSkillsService } from './projects-skills.service';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../../repositories/users.repository';
import { UsersEntity } from '../../entities/users.entity';
import { ProjectsSkillsRepository } from '../../repositories/projects_skills.repository';
import { SkillsService } from '../skills/skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsSkillsEntity])],
  providers: [
    SkillsRepository,
    ProjectsSkillsService,
    ProjectsSkillsResolver,
    UsersService,
    UsersRepository,
    ProjectsSkillsRepository,
    UsersEntity,
    SkillsService,
  ],
  exports: [ProjectsSkillsService],
})
export class ProjectsSkillsModule {}
