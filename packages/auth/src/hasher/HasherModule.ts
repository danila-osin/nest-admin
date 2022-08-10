import { Module } from '@nestjs/common';
import { Hasher } from './Hasher';

@Module({
  exports: [Hasher],
  providers: [Hasher]
})
export class HasherModule {}
