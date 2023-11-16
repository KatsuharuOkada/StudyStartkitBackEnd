import {
  IsDateString,
  IsOptional,
  IsNumber,
  Min,
  IsPositive,
  IsInt,
  IsNotEmpty,
  IsString,
  IsEnum,
  Matches,
  ValidateIf,
  MaxLength,
  MinLength,
  NotContains,
  Contains,
  IsObject,
  IsLatLong,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { OS, STATUS } from '../../../common/constant';

export class AddDeviceDto {
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid reportDate format.' })
  @IsDateString(undefined, { message: 'Invalid rentDate date format.' })
  rentDate: Date;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid reportDate format.' })
  @IsDateString(undefined, { message: 'Invalid returnDate date format.' })
  returnDate: Date;

  @IsEnum(OS)
  os: OS;

  @IsEnum(STATUS)
  status: STATUS;

  // if OS is android, must be input manufacturer
  @ValidateIf((e) => e.os == OS.ANDROID)
  @IsString({ message: 'manufacturer must be a string and required when android' })
  manufacturer: string;

  @IsString({ message: 'osVersion must be a string.' })
  @NotContains(' ')
  @Contains('v')
  osVersion?: string;

  @IsString({ message: 'uuid must be a string.' })
  uuid: string;

  @IsString({ message: 'deviceName must be a string.' })
  @MinLength(4, { message: 'deviceName must be longer than or equal to 4 characters' })
  @MaxLength(8, { message: 'deviceName must be less than or equal to 8 characters' })
  deviceName: string;

  // more eg
  // some param must be object/json
  // @IsObject()
  // payload: any;

  // for check lat/lon
  // @IsLatLong()
  // @IsLatitude()
  // @IsLongitude()
  // lat: number;
}
