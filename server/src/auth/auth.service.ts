import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ENV_VARIABLES } from '../../common/constants/env_constants';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtUtils } from './utils/jwt.utils';
import { CreateUserDto } from '../../common/dtos/user/user.create.dto';
import { UserLoginDto } from '../../common/dtos/user/user.login.dto';

interface UserWithRole {
  id: string;
  email: string;
  userRelatedData: {
    role: string;
  };
}

// And define what your Token contains
interface RefreshTokenPayload {
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly jwtUtils: JwtUtils,
  ) {}

  async register(userData: CreateUserDto) {
    const { email, password, username } = userData;

    const existingUser = await this.userService.findByEmailForAuth(
      userData.email,
    );

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

  async login(userData: UserLoginDto) {
    const user = await this.userService.findOne({ email: userData.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(userData.password, user.password);
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

  async refresh(refreshToken: string) {
    const refreshSecret = this.configService.getOrThrow<string>(
      ENV_VARIABLES.JWT_REFRESH_SECRET,
    );
    const accessSecret = this.configService.getOrThrow<string>(
      ENV_VARIABLES.JWT_SECRET,
    );
    const accessExpiry = this.configService.getOrThrow<string>(
      ENV_VARIABLES.JWT_EXPIRES_IN,
    );
    const refreshExpiry = this.configService.getOrThrow<string>(
      ENV_VARIABLES.JWT_REFRESH_EXPIRES_IN,
    );

    const refreshTokenPayload = this.jwtUtils.verifyToken<RefreshTokenPayload>(
      refreshToken,
      refreshSecret,
    );

    const user = (await this.userService.findOne({
      id: refreshTokenPayload.sub,
    })) as unknown as UserWithRole | null;
    if (!user) throw new UnauthorizedException('User not found');

    const payload: UserWithRole = {
      id: user.id,
      email: user.email,
      userRelatedData: {
        role: user.userRelatedData.role,
      },
    };

    const newAccessToken = this.jwtUtils.generateToken(
      payload,
      accessExpiry,
      accessSecret,
    );

    const newRefreshToken = this.jwtUtils.generateRefreshToken(
      payload,
      refreshExpiry,
      refreshSecret,
    );

    return { newAccessToken, newRefreshToken };
  }

  logout() {
    return { message: 'Logged out successfully' };
  }
}
