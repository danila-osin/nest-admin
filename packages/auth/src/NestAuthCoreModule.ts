import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthModule } from 'auth';
import { AuthorizeModule } from 'authorize';
import { Boot } from 'boot';
import { containers, EntityContainerKey, TokenOptsContainerKey } from 'container';
import { INestAuthModuleOptions } from 'interfaces';
import { UserModule } from 'user';
import { logBoot } from 'utils';

@Global()
@Module({})
export class NestAuthCoreModule {
  public static boot = new Boot();

  static forRoot(options: INestAuthModuleOptions): DynamicModule {
    logBoot();

    containers.entity.set(EntityContainerKey.USER_ENTITY, options.database.entities.User);
    containers.entity.set(EntityContainerKey.SESSION_ENTITY, options.database.entities.Session);

    containers.tokenOpts.set(TokenOptsContainerKey.TTL, options.tokenOpts.ttl);
    containers.tokenOpts.set(TokenOptsContainerKey.SECRET, options.tokenOpts.secret);

    return {
      module: NestAuthCoreModule,
      imports: [UserModule, AuthModule, AuthorizeModule],
      exports: [AuthorizeModule]
    };
  }
}
