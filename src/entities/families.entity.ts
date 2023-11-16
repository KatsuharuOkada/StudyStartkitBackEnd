import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { UserFamiliesEntity } from './user-families.entity';

@Entity('families')
export class FamiliesEntity extends AbstractEntity {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  name: string;

  @OneToMany(() => UserFamiliesEntity, (userFamily) => userFamily.family)
  userFamilies: UserFamiliesEntity[];
}
