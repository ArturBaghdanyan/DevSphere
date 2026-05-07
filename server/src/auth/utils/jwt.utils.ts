import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtUtils {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Generates a standard JWT Access Token
   */
  generateToken(payload: object, expiresIn: string, secret: string): string {
    this.validateConfig(expiresIn, secret);

    const options: JwtSignOptions = {
      secret,
      expiresIn: expiresIn as JwtSignOptions['expiresIn'],
    };

    return this.jwtService.sign(payload, options);
  }

  /**
   * Generates a Refresh Token
   */
  generateRefreshToken(
    payload: object,
    expiresIn: string,
    secret: string,
  ): string {
    this.validateConfig(expiresIn, secret);

    const options: JwtSignOptions = {
      secret,
      expiresIn: expiresIn as JwtSignOptions['expiresIn'],
    };

    return this.jwtService.sign(payload, options);
  }

  /**
   * Verifies a token against a specific secret
   */
  verifyToken<T extends object>(token: string, secret: string): T {
    try {
      return this.jwtService.verify<T>(token, { secret });
    } catch {
      // Omitting (error) entirely is the safest way to avoid linting issues
      // if you aren't using the error object itself.
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private validateConfig(expiresIn: string, secret: string): void {
    if (!expiresIn || !secret) {
      throw new Error(
        'JWT Configuration missing: secret or expiresIn is undefined',
      );
    }
  }
}
