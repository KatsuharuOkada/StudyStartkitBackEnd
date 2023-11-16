import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { ProjectsEntity } from './projects.entity';
import { SkillsEntity } from './skills.entity';

@Entity({ name: 'projects_skills' })
export class ProjectsSkillsEntity extends AbstractEntity {
  @ManyToOne(() => ProjectsEntity, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', eager: true, nullable: false })
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: ProjectsEntity;

  @ManyToOne(() => SkillsEntity, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', eager: true, nullable: false })
  @JoinColumn({ name: 'skill_id', referencedColumnName: 'id' })
  skill: SkillsEntity;
}
