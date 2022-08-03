import { DynamicModule, Module } from '@nestjs/common';
import { Boot } from './boot';
import { containers, USER_ENTITY_KEY } from './container';
import { INestAuthModuleOptions } from './interfaces';
import { UserModule } from './user';
import { logBoot } from './utils/logBoot';

@Module({})
export class NestAuthCoreModule {
  public static boot = new Boot();

  static forRoot(options: INestAuthModuleOptions): DynamicModule {
    logBoot();

    containers.entity.set(USER_ENTITY_KEY, options.database.entities.User);

    return {
      module: NestAuthCoreModule,
      imports: [UserModule]
    };
  }
}
