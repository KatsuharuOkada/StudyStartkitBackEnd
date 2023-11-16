export class AppException<T = any> extends Error {
  errorCode: string;
  details: T;
  constructor(errorCode: string, message: string, details?: T) {
    super();
    this.message = message;
    this.errorCode = errorCode;
    this.details = details || null;
  }
}
