export class DeleteResponse {
  statusCode: number;
  data?: DeleteResultDto;
  message: string;
  error?: Error;
}

export class DeleteResultDto {
  result: boolean;
}
