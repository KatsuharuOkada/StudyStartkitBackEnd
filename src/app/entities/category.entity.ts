import { Exclude } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  BaseEntity,
} from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @PrimaryColumn({ name: 'category_id' })
  categoryId: number;

  @IsNotEmpty({ message: 'Nick name can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: false,
    name: 'category_name',
  })
  categoryName: string;

  @Exclude()
  @IsNotEmpty({ message: 'Password can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;
}
