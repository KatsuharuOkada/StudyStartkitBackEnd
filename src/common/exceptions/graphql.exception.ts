import { HttpException } from '@nestjs/common';
import { HTTP_STATUS_PHRASES } from '../constants/statuses';

type GraphqlExceptionArgs<T = any> = {
  /**
   * Custom error code.
   * Default:  HTTP STATUS PHRASE.
   * @example
   * - NOT_FOUND
   * - BAD_REQUEST
   */
  errorCode?: string | number;
  /**
   * Custom error message.
   * Default:  HTTP STATUS PHRASE.
   * @example
   * - NOT_FOUND
   * - BAD_REQUEST
   */
  errorMessage?: string;
  details?: T;
  /**
   * What do you want data field return when occur error.
   * Default:  null
   * @example
   * {
   *    "data": null,
   *    "error": {
   *      "errorCode": "NOT_FOUND",
   *      "errorMessage": "USER NOT FOUND."
   *    }
   * }
   */
  dataResponse?: any;
};
export class GraphQLException<T = any> extends HttpException {
  errorCode?: string | number;
  details: T;
  errorMessage?: string;
  dataResponse?: any;

  constructor(httpStatusCode: number, args: GraphqlExceptionArgs<T> = undefined) {
    const httpStatusPhrase = HTTP_STATUS_PHRASES[httpStatusCode];
    super(args?.errorMessage || httpStatusPhrase, httpStatusCode);
    this.errorCode = args?.errorCode || httpStatusPhrase;
    this.errorMessage = args?.errorMessage || httpStatusPhrase;
    this.dataResponse = args?.dataResponse || null;
    this.details = args?.details || null;
  }
}
