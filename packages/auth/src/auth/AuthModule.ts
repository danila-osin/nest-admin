import { DynamicModule, Module } from '@nestjs/common';
import { Hasher, HasherModule } from 'hasher';
import { TokenModule, TokenService } from 'token';
import { UserModule, UserService } from 'user';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { INestAuthModuleOptionsApi } from 'interfaces';
import { AuthResolver } from './AuthResolver';

@Module({})
export class AuthModule {
  private static matchModule: Record<INestAuthModuleOptionsApi, DynamicModule> = {
    graphql: {
      module: AuthModule,
      imports: [TokenModule, HasherModule, UserModule],
      providers: [AuthResolver, AuthService, Hasher, UserService, TokenService]
    },
    rest: {
      module: AuthModule,
      imports: [TokenModule, HasherModule, UserModule],
      controllers: [AuthController],
      providers: [AuthService, Hasher, UserService, TokenService]
    }
  };

  static forRoot(api: INestAuthModuleOptionsApi) {
    return this.matchModule[api];
  }
}
