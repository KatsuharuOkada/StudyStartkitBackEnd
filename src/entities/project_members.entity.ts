import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { ProjectsEntity } from './projects.entity';
import { UsersEntity } from './users.entity';
import { IsNotEmpty } from 'class-validator';
import { PROJECT_ROLES } from '../common/constant';

@Entity({ name: 'project_members' })
@Index(['projects', 'member'], { unique: true })
export class ProjectMembersEntity extends AbstractEntity {
  @ManyToOne(() => ProjectsEntity, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', eager: true, nullable: false })
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  projects: ProjectsEntity;

  @ManyToOne(() => UsersEntity, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', eager: true, nullable: false })
  @JoinColumn({ name: 'member_id', referencedColumnName: 'id' })
  member: UsersEntity;

  @IsNotEmpty({ message: 'role can not be null or empty' })
  @Column({
    name: 'role',
    type: 'enum',
    enum: PROJECT_ROLES,
    nullable: false,
    default: PROJECT_ROLES.UNKNOW,
  })
  role: PROJECT_ROLES;

  @CreateDateColumn({ comment: 'time join project', name: 'join_date' })
  joinDate: Date;
}
