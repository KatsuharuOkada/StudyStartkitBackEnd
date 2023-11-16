import { HttpException } from '@nestjs/common';
import { ErrorCode, ErrorMessage } from '../../common/messages';

export class StampNotEnoughException extends HttpException {
  constructor(message?: string | object | any, error: string = ErrorMessage.STAMP_NOT_ENOUGH) {
    super(HttpException.createBody(message, error, ErrorCode.STAMP_NOT_ENOUGH), ErrorCode.STAMP_NOT_ENOUGH);
  }
}
