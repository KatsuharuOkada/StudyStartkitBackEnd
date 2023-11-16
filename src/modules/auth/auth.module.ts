import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local.strategy';
@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_KEY,
      signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRE_TIME, 10) },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, AuthResolver],
  exports: [],
})
export class AuthModule {}
