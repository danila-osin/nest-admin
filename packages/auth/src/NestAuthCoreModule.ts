import { DynamicModule, Module } from '@nestjs/common';
import { Boot } from './boot';
import { USER_ENTITY_KEY } from './container';
import { INestAuthModuleOptions } from './interfaces';
import { UserModule } from './user';

@Module({})
export class NestAuthCoreModule {
  public static boot = new Boot();

  static forRoot(options: INestAuthModuleOptions): DynamicModule {
    this.boot.setEntity(USER_ENTITY_KEY, options.database.entities.User);

    return {
      module: NestAuthCoreModule,
      imports: [UserModule]
    };
  }
}
