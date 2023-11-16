import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsInt, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @Column({ name: 'user_id' })
  @PrimaryGeneratedColumn('increment')
  userId: number;

  @IsNotEmpty({ message: 'Nick name can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: false, name: 'user_name' })
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
    type: 'tinyint',
    precision: 1,
    nullable: false,
    comment: '0:male, 1:female, 2:NA'
  })
  gender: number;

  @IsNotEmpty({ message: 'Access token can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'The token access to server',
    name: 'access_token'
  })
  accessToken: string;

  @IsNotEmpty({ message: 'Refresh token can not be null or empty' })
  @MaxLength(255, { message: 'The length must be less than 255 characters' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'The token to refresh token to access server',
    name: 'refreshToken'
  })
  refreshToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt: Date;
}
