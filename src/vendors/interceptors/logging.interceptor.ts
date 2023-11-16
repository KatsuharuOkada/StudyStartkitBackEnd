import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    if (req) {
      const method = req.method;
      const url = req.url;
      return next.handle().pipe(
        tap(
          () => {
            new Logger(context.getClass().name).log(`${method} ${url} SUCCESS ---- ${Date.now() - now}ms`);
          },
          () => {
            new Logger(context.getClass().name).error(`${method} ${url} ERROR ---- ${Date.now() - now}ms`);
          }
        )
      );
    } else {
      const ctx = GqlExecutionContext.create(context);
      const info = ctx.getInfo();
      return next.handle().pipe(
        tap(
          () => {
            new Logger(context.getClass().name).log(
              `${info.parentType} "${info.fieldName}" SUCCESS ---- ${Date.now() - now}ms`
            );
          },
          () => {
            new Logger(context.getClass().name).error(
              `${info.parentType} "${info.fieldName}" ERROR ---- ${Date.now() - now}ms`
            );
          }
        )
      );
    }
  }
}
