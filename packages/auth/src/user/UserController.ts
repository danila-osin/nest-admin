import { Controller, Get } from '@nestjs/common';
import { UserService } from './UserService';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  get() {
    return this.userService.get();
  }
}
