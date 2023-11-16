export class BaseResponse {
  statusCode: number;
  data?: BaseResultDto;
  message: string;
  error?: Error;
}

export class BaseResultDto {
  result: boolean;
}
