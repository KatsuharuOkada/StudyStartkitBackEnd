import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
require('dotenv').config();

@Injectable()
export class AuthorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authorization = req.headers.authorization;
    const appKey = process.env.APP_KEY;
    const env = process.env.APP_ENV;
    if (env === 'PROD' && authorization !== appKey) {
      throw new HttpException({ result: false, message: 'Unauthorized', data: [] }, 401);
    }
    next();
  }
}
