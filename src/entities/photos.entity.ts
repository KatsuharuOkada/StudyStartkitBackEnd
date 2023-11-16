import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../vendors/base/abstract.entity';
import { UsersEntity } from './users.entity';
import { CommentsEntity } from './comments.entity';

@Entity('photos')
export class PhotosEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: false, name: 'url' })
  url: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'comment' })
  comment: string;

  @ManyToOne(() => UsersEntity, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', eager: true, nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  owner: UsersEntity;

  @OneToMany(() => CommentsEntity, (comment) => comment.photo)
  comments?: CommentsEntity[];
}
