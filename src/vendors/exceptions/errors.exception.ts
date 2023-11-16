import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS } from '../../configs/constants/errors';

export class Exception extends HttpException {
  constructor(
    property: any = ERRORS.INTERNAL_SERVER_ERROR,
    objectOrError?: string | object | any,
    statusCode?: number
  ) {
    super(
      HttpException.createBody(objectOrError, property.message, statusCode || HttpStatus.INTERNAL_SERVER_ERROR),
      property.code
    );
  }
}

export class ExceptionNotFound extends HttpException {
  constructor(property: any = ERRORS.NOT_FOUND, objectOrError?: string | object | any) {
    super(HttpException.createBody(objectOrError, property.message, HttpStatus.NOT_FOUND), property.code);
  }
}

export class ExceptionInvalid extends HttpException {
  constructor(property: any = ERRORS.BAD_REQUEST, objectOrError?: string | object | any) {
    super(HttpException.createBody(objectOrError, property.message, HttpStatus.BAD_REQUEST), property.code);
  }
}

export class ExceptionUnauthorized extends HttpException {
  constructor(property: any = ERRORS.UNAUTHORIZED, objectOrError?: string | object | any) {
    super(HttpException.createBody(objectOrError, property.message, HttpStatus.UNAUTHORIZED), property.code);
  }
}
