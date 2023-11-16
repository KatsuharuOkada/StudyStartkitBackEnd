import format from 'date-fns/format';
import startOfToday from 'date-fns/startOfToday';
import { EntityRepository, MoreThanOrEqual } from 'typeorm';
import { BaseRepository } from '../../../../vendors/base/base.repository';
import { IncentiveEntity } from '../../../entities/incentives.entity';
import { UserIncentiveEntity } from '../../../entities/user_incentive.entity';
import { UserIncentive } from '../../../graphql/stamp.schema';

@EntityRepository(UserIncentiveEntity)
export class UserIncentiveRepository extends BaseRepository<UserIncentiveEntity> {
  /**
   * @description Get user's incentives number
   * @author TrungNM
   * @date 2020-10-09
   * @param {string} userId
   * @returns
   */
  async getCountByUser(userId: string) {
    return this.count({
      userId,
      isUsed: false,
      expiredAt: MoreThanOrEqual(format(startOfToday(), 'yyyy-MM-dd HH:mm:ss')),
    });
  }

  /**
   * @description Create a new user incentive with 3 months expired
   * @author TrungNM
   * @date 2020-10-09
   * @param {number} incentiveId
   * @param {string} userId
   * @returns {Promise<UserIncentiveEntity>}
   */
  async createWithExpire(incentiveId: number, userId: string): Promise<UserIncentiveEntity> {
    const now = new Date();

    return this.create({
      userId,
      incentiveId,
      expiredAt: now.setMonth(now.getMonth() + 3),
    });
  }

  /**
   * @description get user incentives
   * @author LoiNH
   * @date 2020-10-07
   * @param {string} userId
   * @return {*}  {Promise<UserIncentive[]>}
   * @memberof UserIncentiveRepository
   */
  async getUserIncentives(userId: string): Promise<UserIncentive[]> {
    let userIncentives = [];
    try {
      userIncentives = await this.createQueryBuilder('ust')
        .select(['ust.id as id', 'ict.stampCount as stampCount', 'ust.isUsed as isUsed', 'ust.expiredAt as expiredAt'])
        .innerJoin(IncentiveEntity, 'ict', 'ust.incentiveId = ict.id')
        .where('ust.userId = :userId', { userId })
        .getRawMany();
    } catch (error) {
      console.log(`Getting user incentives by user(${userId}) failed.`);
    }
    return userIncentives;
  }

  /**
   * @description update incentive
   * @author LoiNH
   * @date 2020-10-08
   * @param {number} id
   * @return {*}  {Promise<boolean>}
   * @memberof UserIncentiveRepository
   */
  async updateAnUserIncentive(id: number): Promise<boolean> {
    let isUpdateSuccess = false;
    try {
      const userIncentive = await this.getAnUserIncentive(id);
      if (userIncentive) {
        userIncentive.isUsed = true;
        userIncentive.updatedAt = new Date();
        const updated = await this.update({ id }, userIncentive);
        isUpdateSuccess = updated.affected > 0;
      }
    } catch (error) {
      console.log(`Updating user incentive failed.`);
    }
    return isUpdateSuccess;
  }

  /**
   * @description get an incentive
   * @author LoiNH
   * @date 2020-10-08
   * @param {number} id
   * @return {*}  {Promise<UserIncentiveEntity>}
   * @memberof UserIncentiveRepository
   */
  async getAnUserIncentive(id: number): Promise<UserIncentiveEntity> {
    return await this.findOneOrFail(id);
  }
}
