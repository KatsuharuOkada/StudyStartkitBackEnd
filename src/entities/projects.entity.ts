import { Column, Entity, Index, OneToMany } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { ProjectsSkillsEntity } from './projects-skills.entity';
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

  @OneToMany(() => ProjectsSkillsEntity, (ps) => ps.project)
  projectSkills?: ProjectsSkillsEntity[];

  skills?: SkillsEntity[];
}
