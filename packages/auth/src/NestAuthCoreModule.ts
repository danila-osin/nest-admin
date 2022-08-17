import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { AuthModule } from 'auth';
import { AuthorizerModule } from 'authorizer';
import { Boot } from 'boot';
import { NEST_AUTH_API, NEST_AUTH_ENTITIES, NEST_AUTH_TOKEN_OPTIONS } from 'const';
import { debug } from 'debug';
import { INestAuthModuleUserOptions } from 'interfaces';
import { ModuleOptions } from 'ModuleOptions';
import { SerializerModule } from 'serializer';
import { TokenModule } from 'token';
import { UserModule } from 'user';
import { LogBoot } from 'utils';

@Global()
@Module({})
export class NestAuthCoreModule {
  static boot = new Boot();

  @LogBoot(debug('Boot'))
  static forRoot(userOptions: INestAuthModuleUserOptions): DynamicModule {
    const options = ModuleOptions.applyModuleOptions(userOptions);

    const providers: Provider[] = [
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
      imports: [
        AuthorizerModule,
        AuthModule.forRoot(options.api),
        UserModule,
        TokenModule,
        SerializerModule
      ],
      providers,
      exports: [AuthorizerModule, ...providers]
    };
  }
}
