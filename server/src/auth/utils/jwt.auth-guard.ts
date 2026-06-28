import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser>(
    err: Error | null,
    user: TUser,
    info: Error | undefined,
  ): TUser {
    if (err || !user) {
      const message =
        info?.message === 'No auth token'
          ? 'Missing access token. Set Authorization: Bearer <access_token> header.'
          : info?.message || 'Invalid or expired access token';
      throw err ?? new UnauthorizedException(message);
    }
    return user;
  }
}
