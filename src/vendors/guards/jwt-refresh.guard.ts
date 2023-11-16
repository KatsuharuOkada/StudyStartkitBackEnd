import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
require('dotenv').config();

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  constructor(private jwtService: JwtService) {
    super();
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
