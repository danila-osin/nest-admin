import { Module } from '@nestjs/common';
import { UserRepository } from './UserRepository';
import { UserService } from './UserService';

@Module({
  controllers: [],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository]
})
export class UserModule {}
