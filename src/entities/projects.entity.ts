import { Column, Entity, Index, OneToMany } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { ProjectsSkillsEntity } from './projects_skills.entity';
import { SkillsEntity } from './skills.entity';

@Entity({ name: 'projects' })
export class ProjectsEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: false, name: 'project_code', unique: true })
  public projectCode: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'project_name' })
  public projectName: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'project_description' })
  public projectDescription: string;

  @Column({ type: 'datetime', nullable: true, name: 'startDate' })
  public startDate: Date;

  @Column({ type: 'datetime', nullable: true, name: 'endDate' })
  public endDate: Date;

  // Same table name using camel case
  @OneToMany(() => ProjectsSkillsEntity, (ps) => ps.projects)
  projectsSkills?: ProjectsSkillsEntity[];

  skills?: SkillsEntity[];
}
