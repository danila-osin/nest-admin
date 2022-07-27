import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './UserEntity';
import { UsersController } from './UsersController';
import { UsersRepository } from './UsersRepository';
import { UsersService } from './UsersService';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}

