import { Module } from '@nestjs/common';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { Serializer, SerializerModule } from 'serializer';
import { Hasher, HasherModule } from 'hasher';
import { UserModule, UserService } from 'user';

@Module({
  imports: [SerializerModule, HasherModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, Serializer, Hasher, UserService]
})
export class AuthModule {}
