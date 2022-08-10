import { Module } from '@nestjs/common';
import { AuthorizeService } from './AuthorizeService';
import { ContextModule } from 'context';

@Module({
  imports: [ContextModule],
  providers: [AuthorizeService],
  exports: [AuthorizeService]
})
export class AuthorizeModule {}
