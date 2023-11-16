import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../../vendors/base/base.repository';
import { StampNotEnoughException } from '../../../../vendors/exceptions/stamp-not-enough.exception';
import { UserStampEntity } from '../../../entities/user_stamp.entity';

@EntityRepository(UserStampEntity)
export class StampRepository extends BaseRepository<UserStampEntity> {
  /**
   * @description Get number stamps of a user
   * @author TrungNM
   * @date 2020-10-08
   * @param {string} userId
   * @returns {Promise<number>}
   */
  async getUserStampCount(userId: string): Promise<number> {
    const userStamp: UserStampEntity = await this.findOne({ select: ['count'], where: { userId } });
    return userStamp ? userStamp.count : 0;
  }

  /**
   * @description Decrease stamps of a user
   * @author TrungNM
   * @date 2020-10-08
   * @param {number} amount
   * @param {string} userId
   * @returns {Promise<number>}
   */
  async decreaseUserStampCount(amount: number, userId: string): Promise<number> {
    const userStamp: UserStampEntity = await this.findOneOrFail(userId);

    if (userStamp.count < amount) {
      throw new StampNotEnoughException();
    }

    const count = userStamp.count - amount;

    await this.update(userId, { count });

    return count;
  }

  /**
   * @description get user stamp of current date
   * @author LoiNH
   * @date 2020-10-09
   * @param {string} userId
   * @return {*}  {Promise<UserStampEntity>}
   * @memberof StampRepository
   */
  async getStampAddedToday(userId: string): Promise<UserStampEntity> {
    try {
      return await this.createQueryBuilder('ust')
        .where('ust.userId = :userId', { userId })
        .andWhere(`DATE_FORMAT(ust.updatedAt, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')`)
        .getOne();
    } catch (error) {
      console.log(`Get stamp failed: ${error}`);
      return null;
    }
  }

  /**
   * @description check stamp is first scan
   * @author LoiNH
   * @date 2020-10-09
   * @param {string} userId
   * @return {*}  {Promise<boolean>}
   * @memberof StampRepository
   */
  async getUserStamp(userId: string): Promise<UserStampEntity> {
    try {
      return await this.findOneOrFail({ userId });
    } catch (error) {
      console.log(`check first scan stamp error: ${error}`);
      return null;
    }
  }

  /**
   * @description add new stamp
   * @author LoiNH
   * @date 2020-10-09
   * @param {UserStampEntity} input
   * @return {*}  {Promise<boolean>}
   * @memberof StampRepository
   */
  async addStamp(input: UserStampEntity): Promise<boolean> {
    try {
      const inserted = await this.insert(Object.assign(new UserStampEntity(), input));
      if (inserted.identifiers.length > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(`Add stamp error: ${error}`);
      return false;
    }
  }

  /**
   * @description update an existing stamp
   * @author LoiNH
   * @date 2020-10-09
   * @param {string} userId
   * @param {UserStampEntity} input
   * @return {*}  {Promise<boolean>}
   * @memberof StampRepository
   */
  async updateStamp(userId: string, input: UserStampEntity): Promise<boolean> {
    try {
      const updated = await this.update({ userId }, input);
      if (updated.affected === 1) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(`Update stamp failed: ${error}`);
      return false;
    }
  }
}
