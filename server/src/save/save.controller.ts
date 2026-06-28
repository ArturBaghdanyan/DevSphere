import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { SaveService } from './save.service';
import { JwtAuthGuard } from '../auth/utils/jwt.auth-guard';
import type { UserPayload } from '../../types/request.interface';
import { GetUser } from '../auth/decorators/user.decorator';

@Controller('saves')
@UseGuards(JwtAuthGuard)
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post(':postId')
  @UseGuards(JwtAuthGuard)
  async create(@Param('postId') postId: string, @GetUser() user: UserPayload) {
    return await this.saveService.create({
      userId: user.id,
      postId: Number(postId),
    });
  }

  @Delete(':postId')
  async remove(
    @Param('postId') postId: string,
    @Req() req: Request & { user: { id: string } },
  ) {
    const userId = req.user?.id;
    const pid = Number(postId);
    return await this.saveService.removeByUserAndPost(userId, pid);
  }
}
