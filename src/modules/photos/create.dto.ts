import { IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';
import { Field } from '@nestjs/graphql';

export class CreatePhotoDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/[a-zA-Z]/g, { message: 'url Invalid name format.' })
  url: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/[a-zA-Z]/g, { message: 'comment Invalid name format.' })
  comment: string;
}
