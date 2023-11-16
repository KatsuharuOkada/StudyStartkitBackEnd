import { ArgumentsHost, HttpException, HttpStatus, Catch } from '@nestjs/common';
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
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      data: null,
      error: JSON.stringify(exception),
    };
  }

  httpExceptionHandler(exception: HttpException) {
    return {
      statusCode: exception.getStatus(),
      message: exception.message,
      data: null,
      error: JSON.stringify(exception),
    };
  }

  joiExceptionHandler(exception: JoiException) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
      data: null,
      error: JSON.stringify(exception),
    };
  }
}
