import {
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  Catch,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { JoiException } from '../exceptions/joi.exception';

@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    if (exception instanceof HttpException) {
      return this.httpExceptionHandler(exception);
    } else if (exception instanceof JoiException) {
      return this.joiExceptionHandler(exception);
    }
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      data: null,
      error: {
        errorCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        details: [],
      },
    };
  }
  httpExceptionHandler(exception: HttpException) {
    const { error }: any = exception.message || {};
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      data: null,
      error: {
        errorCode: exception.getStatus(),
        message: error,
        details: [],
      },
    };
  }
  joiExceptionHandler(exception: JoiException) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      data: null,
      error: {
        errorCode: exception.errorCode,
        message: exception.message,
        details: exception.details.map((x) => ({
          message: x.message,
          type: x.type,
          key: x.context.key,
          value: x.context.value,
        })),
      },
    };
  }
}
