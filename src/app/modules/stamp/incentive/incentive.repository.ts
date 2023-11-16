import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../../../vendors/base/base.repository';
import { IncentiveEntity } from '../../../entities/incentives.entity';

@EntityRepository(IncentiveEntity)
export class IncentiveRepository extends BaseRepository<IncentiveEntity> {
  /**
   * @description Get all active incentives order by stampCount
   * @author TrungNM
   * @date 2020-10-09
   * @returns {Promise<IncentiveEntity[]>}
   */
  async getAllActive(): Promise<IncentiveEntity[]> {
    return this.find({ where: { status: true }, order: { stampCount: 'ASC' } });
  }

  /**
   * @description Finds entity by id and has status = true
   * @author TrungNM
   * @date 2020-10-09
   * @param {number} id
   * @returns {Promise<IncentiveEntity>}
   */
  async findActiveOrFail(id: number): Promise<IncentiveEntity> {
    return this.findOneOrFail({ where: { id, status: true } });
  }
}
