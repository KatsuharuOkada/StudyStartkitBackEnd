import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';

@Entity({ name: 'projects' })
export class ProjectsEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: false, name: 'code', unique: true })
  code: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'name' })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'description' })
  description: string;

  @Column({ nullable: true, name: 'start_date' })
  startDate: Date;

  @Column({ nullable: true, name: 'end_date' })
  endDate: Date;
}
