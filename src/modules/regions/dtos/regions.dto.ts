import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RegionDto {
  @Expose({ name: 'id' })
  regionId: number;

  @Expose({ name: 'name' })
  regionName: string;

  @Expose()
  postCode: string;
}
