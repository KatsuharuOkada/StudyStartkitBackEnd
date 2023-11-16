import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import * as joi from 'joi';
import { APP_ERROR_CODES } from '../constants/errorCode';
import { GraphQLException } from '../exceptions/graphql.exception';

type ObjectToSchemaJoi<T> = {
  [P in keyof T]: any;
};

@Injectable()
export class JoiValidationPipe<T = any> implements PipeTransform {
  schema: joi.Schema;
  constructor(
    schema: Partial<ObjectToSchemaJoi<T>>,
    private options: joi.ValidationOptions = {
      allowUnknown: true,
    }
  ) {
    this.schema = joi.object(schema);
  }

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, this.options);
    if (error) {
      throw new GraphQLException(HttpStatus.UNPROCESSABLE_ENTITY, {
        errorCode: APP_ERROR_CODES.INPUT_INVALID,
        errorMessage: 'Data input invalid. Please check again.',
        details: error.details.map((x) => ({
          field: x.path,
          value: x.context.value,
          message: x.message,
        })),
      });
    }
    return value;
  }
}
