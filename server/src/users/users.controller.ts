import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }
  //   @Post('post')
  //   async create() {
  //     const user = await this.userService.findOne({ email: '' });
  //     return await this.userService.create(user);
  //   }

  //   @Put('update')
  //   async update() {
  //     const updatedUser = await this.userService.findOne({ email: '' });
  //     return await this.userService.update(updatedUser);
  //   }
}
