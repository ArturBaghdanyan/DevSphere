import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../common/models/entities/User.entity';
import { ErrorMessages } from '../../common/constants/error-messages';
import { APP_MESSAGES } from '../../common/constants/app-messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findByEmailForAuth(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOne(criteria: { id?: string; email?: string }): Promise<User> {
    const user = await this.userRepository.findOne({ where: criteria });
    if (!user) {
      const identifier: string = criteria.id ?? criteria.email ?? '';
      throw new NotFoundException({
        message: APP_MESSAGES.USER.NOT_FOUND(identifier),
        error_code: ErrorMessages.USER_NOT_FOUND,
      });
    }
    return user;
  }

  async create(user: Partial<User>) {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async update(user: User) {
    return await this.userRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.findOne({ id });
    return await this.userRepository.remove(user);
  }
}
