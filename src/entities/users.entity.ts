import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsInt, MaxLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';

@Entity('users')
export class UsersEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: false, name: 'user_name' })
  userName: string;

  @Exclude()
  @IsNotEmpty({ message: 'Password can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @IsNotEmpty({ message: 'uuid can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @IsInt({ message: 'Gender must be 0 or 1' })
  @IsNotEmpty({ message: 'Gender can not be null or empty' })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  gender: string;
}
