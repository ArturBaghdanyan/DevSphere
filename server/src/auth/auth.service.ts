import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ENV_VARIABLES } from '../common/constants/env_constants';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async register(userData: {
    email: string;
    password: string;
    username: string;
  }) {
    const { email, password, username } = userData;

    const existingUser = await this.userService.findOne(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    return this.userService.create({
      email,
      username,
      password: hashedPassword,
    });
  }

  async login(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    const { JWT_SECRET: jwtSecretKey } = ENV_VARIABLES as {
      JWT_SECRET: string;
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>(jwtSecretKey),
        expiresIn: '1h',
      }),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  logout() {
    return { message: 'Logged out successfully' };
  }
}
