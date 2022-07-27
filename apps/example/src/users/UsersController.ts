import { Authorize } from '@nest-admin/auth';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './interfaces';
import { UsersPolicy } from './UsersPolicy';
import { UsersService } from './UsersService';

@Controller('users')
@Authorize({ Policy: UsersPolicy })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public get() {
    return this.usersService.get();
  }

  @Get(':id')
  public async getOne(@Param('id') id: string) {
    return (await this.usersService.get({ id }))?.[0];
  }

  @Post()
  public create(@Body() createDto: CreateUserDto) {
    return this.usersService.create(createDto);
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}

