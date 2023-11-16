import { Injectable } from '@nestjs/common';
import { IncentiveEntity } from '../../../entities/incentives.entity';
import { UserIncentiveEntity } from '../../../entities/user_incentive.entity';
import { UserIncentive } from '../../../graphql/stamp.schema';
import { UserIncentiveRepository } from '../incentive/user-incentive.repository';
import { IncentiveRepository } from './incentive.repository';

@Injectable()
export class IncentiveService {
  constructor(
    private incentiveRepository: IncentiveRepository,
    private userIncentiveRepository: UserIncentiveRepository
  ) {}

  /**
   * @description Get all active incentives
   * @author TrungNM
   * @date 2020-10-09
   * @returns {Promise<IncentiveEntity[]>}
   */
  async getIncentives(): Promise<IncentiveEntity[]> {
    return this.incentiveRepository.getAllActive();
  }

  /**
   * @description Get user's incentives number
   * @author TrungNM
   * @date 2020-10-09
   * @param {string} userId
   * @returns
   */
  async getUserIncentiveCount(userId: string) {
    return this.userIncentiveRepository.getCountByUser(userId);
  }

  /**
   * @description Get incentive data by id
   * @author TrungNM
   * @date 2020-10-08
   * @param {number} id
   * @returns {Promise<IncentiveEntity>}
   */
  async getIncentive(id: number): Promise<IncentiveEntity> {
    return this.incentiveRepository.findActiveOrFail(id);
  }

  /**
   * @description Add a incentive to a user
   * @author TrungNM
   * @date 2020-10-08
   * @param {number} incentiveId
   * @param {string} userId
   * @returns {Promise<UserIncentiveEntity>}
   */
  async createIncentive(incentiveId: number, userId: string): Promise<UserIncentiveEntity> {
    return this.userIncentiveRepository.createWithExpire(incentiveId, userId);
  }

  /**
   * @description get user incentives
   * @author LoiNH
   * @date 2020-10-08
   * @param {string} userId
   * @return {*}  {Promise<UserIncentive[]>}
   * @memberof IncentiveService
   */
  async getUserIncentives(userId: string): Promise<UserIncentive[]> {
    return await this.userIncentiveRepository.getUserIncentives(userId);
  }

  /**
   * @description update and user incentive
   * @author LoiNH
   * @date 2020-10-08
   * @param {number} id
   * @return {*}  {Promise<boolean>}
   * @memberof IncentiveService
   */
  async updateAnUserIncentive(id: number): Promise<boolean> {
    return await this.userIncentiveRepository.updateAnUserIncentive(id);
  }
}
