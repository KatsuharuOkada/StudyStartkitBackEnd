import { ExceptionFilter, Catch, ExecutionContext, HttpException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const rs = ctx.getContext();
    // Avoid error res undefined
    if (typeof rs === 'object' && rs.res) {
      rs.res.status(exception.getStatus());
    }
  }
}
