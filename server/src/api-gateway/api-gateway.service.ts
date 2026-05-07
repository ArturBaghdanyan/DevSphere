import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../../common/dtos/user/user.create.dto';
import { UserLoginDto } from '../../common/dtos/user/user.login.dto';

@Injectable()
export class ApiGatewayService {
  constructor(private readonly authService: AuthService) {}

  async register(createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  async login(userData: UserLoginDto) {
    return this.authService.login(userData);
  }

  async refresh(token: string) {
    return this.authService.refresh(token);
  }

  logout() {
    return this.authService.logout();
  }
}
