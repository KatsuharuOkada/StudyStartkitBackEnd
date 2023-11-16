import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authorization = req.headers.authorization;
    const appKey = process.env.APP_KEY;
    if (authorization !== appKey) {
      // throw new HttpException({ result: false, message: 'Unauthorized', data: [] }, 401);
    }
    next();
  }
}
