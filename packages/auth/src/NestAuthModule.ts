import { DynamicModule, Module } from '@nestjs/common';
import { INestAuthModuleOptions } from 'interfaces';
import { NestAuthCoreModule } from 'NestAuthCoreModule';
import 'reflect-metadata';

@Module({})
export class NestAuthModule {
  public static forRoot(options: INestAuthModuleOptions): DynamicModule {
    return {
      module: NestAuthModule,
      imports: [NestAuthCoreModule.forRoot(options)]
    };
  }
}
