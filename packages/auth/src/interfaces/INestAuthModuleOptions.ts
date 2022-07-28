import { IUserEntity } from '../user';
import { ClassType } from './shared';

export type INestAuthModuleOptionsDatabaseType = 'typeorm';

export interface INestAuthModuleOptions {
  database: {
    type: INestAuthModuleOptionsDatabaseType;
    entities: {
      User: ClassType<IUserEntity>;
    };
  };
}

