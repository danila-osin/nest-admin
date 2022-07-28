import { DynamicModule, Module } from '@nestjs/common';
import { INestAuthModuleOptions } from './interfaces';
import { setUserEntity, UserModule } from './user';

@Module({})
export class NestAuthModule {
  public static forRoot(options: INestAuthModuleOptions): DynamicModule {
    const { User } = options.database.entities;

    console.log(User);

    setUserEntity(User);

    return {
      module: NestAuthModule,
      imports: [UserModule],
    };
  }
}

