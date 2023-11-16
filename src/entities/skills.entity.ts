import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { IsNotEmpty } from 'class-validator';

export enum LANGUAGES {
  EN = 'en',
  JA = 'ja',
}

@Entity({ name: 'skills' })
export class SkillsEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: false, name: 'skill_name', unique: true })
  public skillName: string;

  @IsNotEmpty({ message: 'LANGUAGES can not be null or empty' })
  @Column({ type: 'varchar', length: 255, nullable: false, name: 'language', unique: false })
  public language: string;
}
