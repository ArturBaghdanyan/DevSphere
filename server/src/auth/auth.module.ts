import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './utils/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { JwtUtils } from './utils/jwt.utils';
import { JwtAuthGuard } from './utils/jwt.auth-guard';

@Module({
  providers: [AuthService, JwtStrategy, JwtUtils, JwtAuthGuard],
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  exports: [
    AuthService,
    PassportModule,
    JwtUtils,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class AuthModule {}
