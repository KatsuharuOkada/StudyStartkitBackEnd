import { Exclude, Expose, Type } from 'class-transformer';
import { RegionDto } from '../../regions/dtos/regions.dto';

@Exclude()
export class CityDto {
  @Expose({ name: 'id' })
  cityId: number;

  @Expose({ name: 'name' })
  cityName: string;

  @Expose()
  postCode: string;

  @Expose()
  @Type(() => RegionDto)
  region: RegionDto;
}
