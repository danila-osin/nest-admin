import { Module } from '@nestjs/common';
import { Hasher, HasherModule } from 'hasher';
import { TokenModule, TokenService } from 'token';
import { UserModule, UserService } from 'user';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';

@Module({
  imports: [TokenModule, HasherModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, Hasher, UserService, TokenService]
})
export class AuthModule {}
