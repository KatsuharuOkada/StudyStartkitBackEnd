// Generated by ThanhLD

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsEntity } from '../../entities/skills.entity';
import { SkillsRepository } from '../../repositories/skills.repository';
import { SkillsResolver } from './skills.resolver';
import { SkillsService } from './skills.service';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../../repositories/users.repository';
import { UsersEntity } from '../../entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillsEntity])],
  providers: [SkillsRepository, SkillsService, SkillsResolver, UsersService, UsersRepository, UsersEntity],
  exports: [SkillsService],
})
export class SkillsModule {}