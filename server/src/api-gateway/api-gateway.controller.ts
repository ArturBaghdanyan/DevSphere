import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../../common/dtos/user/user.create.dto';
import { UserLoginDto } from '../../common/dtos/user/user.login.dto';

@Controller('api')
export class ApiGatewayController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: UserLoginDto) {
    const { accessToken, refreshToken, user } =
      await this.authService.login(loginDto);

    return { access_token: accessToken, refresh_token: refreshToken, user };
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    return await this.authService.refresh(refreshToken);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
    return { message: 'Logged out successfully' };
  }
}
