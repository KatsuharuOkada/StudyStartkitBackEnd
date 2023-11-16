import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Field } from '@nestjs/graphql';

export class CreatePhotoDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  url: string;

  @Field()
  @IsOptional()
  @IsString()
  comment: string;
}
