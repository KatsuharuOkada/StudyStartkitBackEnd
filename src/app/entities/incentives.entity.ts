import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserIncentiveEntity } from './user_incentive.entity';

@Entity('incentives')
export class IncentiveEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true }) id: number;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  stampCount: number;

  @Column({ length: 1000 })
  description: string;

  @Column({ type: 'tinyint', width: 1, default: 0, comment: '0: unused, 1: used, -1: deleted' })
  status: number;

  @CreateDateColumn({ type: 'timestamp', precision: null, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: null, default: () => 'NULL', nullable: true })
  updatedAt: Date;

  // Relations
  @OneToMany((type) => UserIncentiveEntity, (userIncentive) => userIncentive.incentive)
  userIncentives: UserIncentiveEntity[];
}
