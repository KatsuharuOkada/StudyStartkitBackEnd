import { ArgumentsHost, HttpException, HttpStatus, Logger, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class AppExceptionFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    if (exception instanceof HttpException) {
      return this.httpExceptionHandler(exception);
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
  // joiExceptionHandler(exception: JoiException) {
  //   return {
  //     statusCode: HttpStatus.BAD_REQUEST,
  //     data: null,
  //     error: {
  //       errorCode: exception.errorCode,
  //       message: exception.message,
  //       details: exception.details.map((x) => ({
  //         message: x.message,
  //         type: x.type,
  //         key: x.context.key,
  //         value: x.context.value,
  //       })),
  //     },
  //   };
  // }
}
