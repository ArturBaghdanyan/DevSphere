import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../common/models/entities/User.entity';
import { ErrorMessages } from '../common/constants/error-messages.enum';
import { APP_MESSAGES } from '../common/constants/app-messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException({
        message: APP_MESSAGES.USER.NOT_FOUND(id),
        error_code: ErrorMessages.USER_NOT_FOUND,
      });
    }
    return user;
  }

  async create(user: Partial<User>) {
    return await this.userRepository.save(user);
  }

  async update(user: User) {
    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
