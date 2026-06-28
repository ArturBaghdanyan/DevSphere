import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import type { UserPayload } from '../../types/request.interface';
import { GetUser } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/utils/jwt.auth-guard';

@Controller('likes')
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':postId')
  async createLike(
    @Param('postId') postId: string,
    @GetUser() user: UserPayload,
  ) {
    return await this.likesService.create(user.id, Number(postId));
  }

  @Delete(':postId')
  async delete(
    @Param('postId') postId: string,
    @GetUser() user: UserPayload,
  ) {
    return await this.likesService.deleteByUserAndPost(user.id, Number(postId));
  }
}
