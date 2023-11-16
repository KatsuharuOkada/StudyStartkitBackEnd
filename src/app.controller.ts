import BaseController from './common/controller/base.controller';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  public async index(): Promise<string> {
    return 'Hello friend Good Luck To You!';
  }
}
