import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Save } from '../../common/models/entities/Save.entity';

@Injectable()
export class SaveService {
  constructor(
    @InjectRepository(Save)
    private readonly saveRepository: Repository<Save>,
  ) {}

  async create(save: Partial<Save>) {
    const createSave = this.saveRepository.create(save);
    return await this.saveRepository.save(createSave);
  }
  async removeByUserAndPost(userId: string, postId: number) {
    return await this.saveRepository.delete({ userId, postId });
  }
}
