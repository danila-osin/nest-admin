import { DynamicModule, Module } from '@nestjs/common';
import { INestAuthModuleUserOptions } from 'interfaces';
import { NestAuthCoreModule } from 'NestAuthCoreModule';
import 'reflect-metadata';

@Module({})
export class NestAuthModule {
  public static forRoot(userOptions: INestAuthModuleUserOptions): DynamicModule {
    return {
      module: NestAuthModule,
      imports: [NestAuthCoreModule.forRoot(userOptions)]
    };
  }
}
