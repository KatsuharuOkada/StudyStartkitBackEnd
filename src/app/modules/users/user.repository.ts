import { EntityRepository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { BaseRepository } from '../../../vendors/base/base.repository';

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
  findByEmail(email: string): Promise<User> {
    return this.findOne({
      where: {
        email
      }
    });
  }
}
