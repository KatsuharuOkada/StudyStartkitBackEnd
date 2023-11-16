import { ExceptionFilter, Catch, ExecutionContext, HttpException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const rs = ctx.getContext();
    const status = exception.getStatus();
    // Avoid error res undefined
    if (exception instanceof HttpException) {
      const error = {
        statusCode: status,
        error: exception.getResponse()['message'],
      };
      return error;
    }
    if (typeof rs === 'object' && rs.res) {
      rs.res.status(status);
    }
  }
}
