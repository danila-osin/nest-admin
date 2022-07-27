import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class NestAuthModule {
  public static forRoot(typeOrmModule: DynamicModule): DynamicModule {
    return {
      module: NestAuthModule,
      imports: [typeOrmModule],
    };
  }
}

