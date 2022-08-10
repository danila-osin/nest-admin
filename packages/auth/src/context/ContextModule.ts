import { Module } from '@nestjs/common';
import { TokenModule, TokenService } from 'token';
import { UserModule, UserService } from 'user';
import { ContextService } from './ContextService';

@Module({
  imports: [UserModule, TokenModule],
  providers: [ContextService, UserService, TokenService],
  exports: [ContextService]
})
export class ContextModule {}
