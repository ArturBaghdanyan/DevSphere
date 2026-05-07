import { Body, Controller, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreateUserDto } from '../../common/dtos/user/user.create.dto';
import { UserLoginDto } from '../../common/dtos/user/user.login.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';

@Controller('api')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.apiGatewayService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: UserLoginDto) {
    return this.apiGatewayService.login(loginDto);
  }

  //   @Get('profile')
  //   @UseGuards(AuthGuard('jwt'))
  //   async getProfile(@Req() req: Request) {
  //     return req.user;
  //   }
}
