import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthModule } from 'auth';
import { AuthorizerModule } from 'authorizer';
import { Boot } from 'boot';
import { NEST_AUTH_ENTITIES, NEST_AUTH_API, NEST_AUTH_TOKEN_OPTIONS } from 'const';
import { INestAuthModuleUserOptions } from 'interfaces';
import { ModuleOptions } from 'ModuleOptions';
import { UserModule } from 'user';
import { LogBoot } from 'utils';
import { debug } from 'debug';

@Global()
@Module({})
export class NestAuthCoreModule {
  static boot = new Boot();

  @LogBoot(debug('Boot'))
  static forRoot(userOptions: INestAuthModuleUserOptions): DynamicModule {
    const options = ModuleOptions.applyModuleOptions(userOptions);

    const providers = [
      {
        provide: NEST_AUTH_ENTITIES,
        useValue: options.database.entities
      },
      {
        provide: NEST_AUTH_TOKEN_OPTIONS,
        useValue: options.tokenOptions
      },
      {
        provide: NEST_AUTH_API,
        useValue: options.api
      }
    ];

    return {
      module: NestAuthCoreModule,
      imports: [UserModule, AuthModule.forRoot(options.api), AuthorizerModule],
      providers,
      exports: [AuthorizerModule, ...providers]
    };
  }
}
