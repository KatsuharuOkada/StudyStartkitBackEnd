import { SucceedCode, SuccessMessage, ErrorCode, ErrorMessage } from '../../common/messages';

export class Base {
  successCodes: any;
  successMessages: any;
  errorCodes: any;
  errorMessages: any;
  constructor() {
    this.successCodes = SucceedCode;
    this.successMessages = SuccessMessage;
    this.errorCodes = ErrorCode;
    this.errorMessages = ErrorMessage;
  }
}
