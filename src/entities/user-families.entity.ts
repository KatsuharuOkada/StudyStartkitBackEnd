import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { UsersEntity } from './users.entity';
import { FamiliesEntity } from './families.entity';

@Entity('user_families')
export class UserFamiliesEntity extends AbstractEntity {
  @ManyToOne(() => UsersEntity, (user) => user.userFamilies, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UsersEntity;

  @ManyToOne(() => FamiliesEntity, (family) => family.userFamilies, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'familyId', referencedColumnName: 'id' })
  family: FamiliesEntity;

  @Column({ name: 'isOwner', type: 'boolean', nullable: false, default: 0 })
  isOwner: boolean;
}
