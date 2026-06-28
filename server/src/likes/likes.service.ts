import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../../common/models/entities/Like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  async create(userId: string, postId: number) {
    const newLike = this.likeRepository.create({ userId, postId });
    return await this.likeRepository.save(newLike);
  }

  async deleteByUserAndPost(userId: string | undefined, postId: number) {
    return await this.likeRepository.delete({ userId, postId });
  }
}
