import { Controller, Get, Injectable } from '@nestjs/common';

@Controller()
@Injectable()
export class AppController {
  @Get()
  public async index(): Promise<string> {
    return 'Hello friend Good Luck To You!';
  }
}
