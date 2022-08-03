import { Type } from '@nestjs/common';
import { IUserEntity } from '../user';

export type INestAuthModuleOptionsDatabaseType = 'typeorm';

export interface INestAuthModuleOptions {
  database: {
    type: INestAuthModuleOptionsDatabaseType;
    entities: {
      User: Type<IUserEntity>;
    };
  };
}
