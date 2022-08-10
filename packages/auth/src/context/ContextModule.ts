import { Module } from '@nestjs/common';
import { ContextService } from './ContextService';

@Module({
  providers: [ContextService],
  exports: [ContextService]
})
export class ContextModule {}
