import BaseController from '../../../common/controller/base.controller';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';

@Controller('/home')
export class HomeController extends BaseController {

    @Get()
    public async index(): Promise<string> {
        const data = await this.test();
        return 'Hello friend Good Luck To You! Im Home - ' + data;
    }
}
