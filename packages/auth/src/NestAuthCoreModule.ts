import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthModule } from 'auth';
import { AuthorizeModule } from 'authorize';
import { Boot } from 'boot';
import { NEST_AUTH_ENTITIES, NEST_AUTH_TOKEN_OPTIONS } from 'const';
import { INestAuthModuleOptions } from 'interfaces';
import { ModuleOptions } from 'ModuleOptions';
import { UserModule } from 'user';
import { logBoot } from 'utils';

@Global()
@Module({})
export class NestAuthCoreModule {
  static boot = new Boot();

  static forRoot(userOptions: INestAuthModuleOptions): DynamicModule {
    logBoot();

    const options = ModuleOptions.applyModuleOptions(userOptions);

    return {
      module: NestAuthCoreModule,
      imports: [UserModule, AuthModule, AuthorizeModule],
      providers: [
        {
          provide: NEST_AUTH_ENTITIES,
          useValue: options.database.entities
        },
        {
          provide: NEST_AUTH_TOKEN_OPTIONS,
          useValue: options.tokenOptions
        }
      ],
      exports: [AuthorizeModule]
    };
  }
}
