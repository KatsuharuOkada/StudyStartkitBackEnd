import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, pipe, throwError, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { error } from 'winston';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next
      .handle()
      .pipe(
        map((data) => {
          return data;
        })
      )
      .pipe(
        catchError((err) => {
          console.log('into interceptor', err);
          return throwError(err);
        })
      );
  }
}
