import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { JoiException } from '../exceptions/joi.exception';
import joi from 'joi';

@Injectable()
export class JoiValidationPipe<T = any> implements PipeTransform {
  schema: joi.Schema;
  constructor(
    schema: joi.Schema,
    private options: joi.ValidationOptions = {
      allowUnknown: true,
    }
  ) {
    this.schema = schema;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    const { error } = this.schema.validate(value, this.options);
    if (error) {
      throw new JoiException(error);
    }
    return value;
  }
}
