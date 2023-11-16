import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
import { ENV_CONFIGS } from '../../configs/constants/constants';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../../repositories/users.repository';
@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: ENV_CONFIGS.APP.JWT_ACCESS_KEY,
      signOptions: { expiresIn: ENV_CONFIGS.APP.JWT_ACCESS_TOKEN_EXPIRE_TIME },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, LocalStrategy, AuthResolver, UsersService, UsersRepository],
  exports: [AuthResolver],
})
export class AuthModule {}
