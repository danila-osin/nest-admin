import { Module } from '@nestjs/common';
import { Authorizer } from './Authorizer';
import { ContextModule } from 'context';

@Module({
  imports: [ContextModule],
  providers: [Authorizer],
  exports: [Authorizer]
})
export class AuthorizerModule {}
