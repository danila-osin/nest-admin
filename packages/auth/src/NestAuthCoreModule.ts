import { DynamicModule, Module } from '@nestjs/common';
import { Boot } from 'boot';
import { containers, EntityContainerKey } from 'container';
import { INestAuthModuleOptions } from 'interfaces';
import { UserModule } from 'user';
import { logBoot } from 'utils';

@Module({})
export class NestAuthCoreModule {
  public static boot = new Boot();

  static forRoot(options: INestAuthModuleOptions): DynamicModule {
    logBoot();

    containers.entity.set(EntityContainerKey.USER_ENTITY, options.database.entities.User);

    return {
      module: NestAuthCoreModule,
      imports: [UserModule]
    };
  }
}
