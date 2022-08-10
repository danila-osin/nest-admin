import { Module } from '@nestjs/common';
import { Serializer } from './Serializer';

@Module({
  providers: [Serializer],
  exports: [Serializer]
})
export class SerializerModule {}
