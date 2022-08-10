import { Module } from '@nestjs/common';
import { Serializer, SerializerModule } from 'serializer';
import { TokenService } from './TokenService';

@Module({
  imports: [SerializerModule],
  providers: [Serializer, TokenService],
  exports: [TokenService, Serializer]
})
export class TokenModule {}
