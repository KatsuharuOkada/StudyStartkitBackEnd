import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { UsersEntity } from './users.entity';
import { PhotosEntity } from './photos.entity';

@Entity('comments')
export class CommentsEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: true, name: 'comment' })
  comment: string;

  @ManyToOne(() => UsersEntity, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', eager: true, nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  users: UsersEntity;

  @ManyToOne(() => PhotosEntity, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', eager: true, nullable: false })
  @JoinColumn({ name: 'photo_id', referencedColumnName: 'id' })
  photos: PhotosEntity;
}
