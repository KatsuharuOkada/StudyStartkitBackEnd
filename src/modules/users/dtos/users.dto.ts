import { GENDER } from '../../../common/constants';
import { Exclude, Expose, Type } from 'class-transformer';
import { CityDto } from '../../cities/dtos/cities.dto';

@Exclude()
export class UserDto {
  @Expose({ name: 'id' })
  id: number;

  @Expose()
  email: string;

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  nickName?: string;

  @Expose()
  gender: GENDER;

  @Expose()
  birthDate?: Date;

  @Expose()
  phoneNumber?: string;

  @Expose()
  gatewayId?: string;

  @Expose()
  @Type(() => CityDto)
  city?: CityDto;
}
