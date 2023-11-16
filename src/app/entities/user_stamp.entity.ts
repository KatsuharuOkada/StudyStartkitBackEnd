import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AddStampReason } from '../graphql/stamp.schema';

@Entity('user_stamp')
export class UserStampEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { unsigned: true }) id: number;

  @Column({ type: 'char', length: 33, comment: 'store line user id' })
  @Index()
  userId: string;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  count: number;

  @Column({ type: 'enum', enum: AddStampReason, default: AddStampReason.SCAN })
  reason: AddStampReason;

  @CreateDateColumn({ type: 'timestamp', precision: null, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: null, default: () => 'NULL', nullable: true })
  updatedAt: Date;
}
