export enum ErrorMessage {
  INVALID_PAGER = 'Pager is invalid',
  DATA_NOT_FOUND = 'Data not found',
  HEADER_NOT_VALID = 'Invalid Header',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  INVALID_ARGUMENTS = 'Invalid Arguments',
  STAMP_UPDATE_FAIL = 'Stamp update fail',
  STAMP_ADD_MORE_ERROR = 'Stamp added, please wait next day',
  QR_CODE_INVALID = 'QR Code is invalid',
  STAMP_NOT_ENOUGH = 'Stamp not enough',
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
  STAMP_FAIL = 204,
  STAMP_NOT_ENOUGH = 460,
}

export enum CustomErrorCode {
  PAGER_ERR_CODE = 701,
  DATA_NOT_FOUND = 702,
}
export enum SucceedCode {
  OK = 200,
}
