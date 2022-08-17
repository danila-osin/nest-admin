import { Module } from '@nestjs/common';
import { Serializer, SerializerModule } from 'serializer';
import { TokenService } from './TokenService';

@Module({
  imports: [SerializerModule],
  providers: [TokenService, Serializer],
  exports: [TokenService, Serializer]
})
export class TokenModule {}
