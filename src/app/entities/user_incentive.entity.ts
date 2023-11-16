import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IncentiveEntity } from './incentives.entity';

@Entity('user_incentive')
export class UserIncentiveEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true }) id: number;

  @Column({ type: 'char', length: 33, comment: 'store line user id' })
  @Index()
  userId: string;

  @Column({ type: 'int', unsigned: true })
  incentiveId: number;

  @Column({ type: 'boolean', width: 1, unsigned: true, default: false })
  isUsed: boolean;

  @Column({ type: 'timestamp', precision: null, default: () => 'CURRENT_TIMESTAMP' })
  expiredAt: Date;

  @CreateDateColumn({ type: 'timestamp', precision: null, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: null, default: () => 'NULL', nullable: true })
  updatedAt: Date;

  // Relations
  @ManyToOne((type) => IncentiveEntity, (incentive) => incentive.userIncentives)
  @JoinColumn({ name: 'incentiveId' })
  incentive: IncentiveEntity;
}
