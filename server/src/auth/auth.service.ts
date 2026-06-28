import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ENV_VARIABLES } from '../../common/constants/env_constants';
import { JwtUtils } from './utils/jwt.utils';
import { CreateUserDto } from '../../common/dtos/user/user.create.dto';
import { UserLoginDto } from '../../common/dtos/user/user.login.dto';

interface RefreshTokenPayload {
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtUtils: JwtUtils,
  ) {}

  async register(userData: CreateUserDto) {
    const existingUser = await this.userService.findByEmailForAuth(
      userData.email,
    );
    if (existingUser) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(userData.password, 12);
    return this.userService.create({ ...userData, password: hashedPassword });
  }

  async login(userData: UserLoginDto) {
    const user = await this.userService.findOne({ email: userData.email });
    if (!user || !(await bcrypt.compare(userData.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtUtils.generateToken(
      payload,
      15 * 60, // 15 minutes in seconds
      this.configService.getOrThrow<string>(ENV_VARIABLES.JWT_SECRET),
    );

    const refreshToken = await this.jwtUtils.generateRefreshToken(
      { sub: user.id },
      7 * 24 * 60 * 60, // 7 days in seconds
      this.configService.getOrThrow<string>(ENV_VARIABLES.JWT_REFRESH_SECRET),
    );

    console.log('acc', accessToken, refreshToken);
    return {
      accessToken,
      refreshToken,
      user: { id: user.id, username: user.username },
    };
  }

  async refresh(refreshToken: string) {
    try {
      const refreshSecret = this.configService.getOrThrow<string>(
        ENV_VARIABLES.JWT_REFRESH_SECRET,
      );
      const payload = await this.jwtUtils.verifyToken<RefreshTokenPayload>(
        refreshToken,
        refreshSecret,
      );

      const user = await this.userService.findOne({ id: payload.sub });
      if (!user) throw new UnauthorizedException('User not found');

      const newAccessToken = await this.jwtUtils.generateToken(
        { sub: user.id, email: user.email },
        15 * 60, // 15 minutes in seconds
        this.configService.getOrThrow<string>(ENV_VARIABLES.JWT_SECRET),
      );

      const newRefreshToken = await this.jwtUtils.generateRefreshToken(
        { sub: user.id },
        7 * 24 * 60 * 60, // 7 days in seconds
        refreshSecret,
      );

      return { newAccessToken, newRefreshToken };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('REFRESH_TOKEN_VERIFY_ERROR:', errorMessage);
      throw new UnauthorizedException(
        'Token verification failed: ' + errorMessage,
      );
    }
  }

  logout() {
    return { message: 'Logged out successfully' };
  }
}
