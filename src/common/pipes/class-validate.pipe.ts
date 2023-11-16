import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { GraphQLException } from '../exceptions/graphql.exception';
import { APP_ERROR_CODES } from '../constants/errorCode';

@Injectable()
export class ClassValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new GraphQLException(HttpStatus.UNPROCESSABLE_ENTITY, {
        errorCode: APP_ERROR_CODES.INPUT_INVALID,
        errorMessage: 'Data input invalid. Please check again.',
        details: errors.map((x) => ({
          field: x.property,
          value: x.value,
          message: Object.values(x.constraints).join('-'),
        })),
      });
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
