import { IsNotEmpty, IsInt, Min, Max, IsOptional, IsBoolean } from 'class-validator';
import { Field } from '@nestjs/graphql';

export class GetPhotosDto {
  @IsInt({ message: 'limit must be number' })
  @IsNotEmpty({ message: 'limit not empty' })
  @Min(1, { message: 'limit must be greater or equal 1' })
  @Max(50, { message: 'limit must be less than 50' })
  @Field()
  limit: number;

  @IsOptional()
  @IsInt({ message: 'offset must be number' })
  @Min(0, { message: 'offset must be greater or equal 0' })
  @Field()
  offset?: number;

  @IsOptional()
  @IsInt({ message: 'page must be number' })
  @Min(1, { message: 'page must be greater or equal 1' })
  @Field()
  page?: number;

  @IsOptional()
  @IsBoolean({ message: 'isTakeAll must be false or true' })
  @Field()
  isTakeAll?: boolean;
}
