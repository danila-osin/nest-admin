import { DynamicModule, Module } from '@nestjs/common';
import { INestAuthModuleOptions } from './interfaces';
import { UserModule } from './user';

@Module({})
export class NestAuthModule {
  public static forRoot(_: INestAuthModuleOptions): DynamicModule {
    return {
      module: NestAuthModule,
      imports: [UserModule],
    };
  }
}

