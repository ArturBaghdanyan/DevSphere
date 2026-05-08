import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtils {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(
    payload: object,
    expiresIn: number,
    secret: string,
  ): Promise<string> {
    this.validateConfig(expiresIn, secret);
    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  async generateRefreshToken(
    payload: object,
    expiresIn: number,
    secret: string,
  ): Promise<string> {
    this.validateConfig(expiresIn, secret);
    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  async verifyToken<T extends object>(
    token: string,
    secret: string,
  ): Promise<T> {
    try {
      return await this.jwtService.verifyAsync<T>(token, { secret });
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private validateConfig(expiresIn: number, secret: string): void {
    if (!expiresIn || expiresIn <= 0 || !secret) {
      throw new Error(
        'JWT Configuration missing: secret or expiresIn is undefined',
      );
    }
  }
}
