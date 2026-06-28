import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDto } from '../../common/dtos/posts/posts.create.dto';
import { JwtAuthGuard } from '../auth/utils/jwt.auth-guard';
import type { UserPayload } from '../../types/request.interface';
import { GetUser } from '../auth/decorators/user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createPostsDto: CreatePostsDto,
    @GetUser() user: UserPayload,
  ) {
    return await this.postsService.create(createPostsDto, user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postsService.findOne(Number(id));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @GetUser() user: UserPayload) {
    const postId = Number(id);
    return await this.postsService.remove(postId, user.id);
  }
}
