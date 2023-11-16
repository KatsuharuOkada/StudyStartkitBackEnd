export enum ErrorMessage {
  INVALID_PAGER = 'Pager is invalid',
  DATA_NOT_FOUND = 'Data not found',
  HEADER_NOT_VALID = 'Invalid Header',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  INVALID_ARGUMENTS = 'Invalid Arguments',
}

export enum SuccessMessage {
  SUCCESS = 'Successful',
}

export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOKEN_REQUIRED = 499,
  HEADER_FAILURE = 417,
}

export enum CustomErrorCode {
  PAGER_ERR_CODE = 701,
  DATA_NOT_FOUND = 702,
}
export enum SucceedCode {
  OK = 200,
}
