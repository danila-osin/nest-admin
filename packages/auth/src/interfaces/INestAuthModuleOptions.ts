import { Type } from '@nestjs/common';
import { ISessionEntity } from 'session';
import { IUserEntity } from 'user';

export type INestAuthModuleOptionsDatabaseType = 'typeorm';

export interface INestAuthModuleOptions {
  database: {
    type: INestAuthModuleOptionsDatabaseType;
    entities: {
      User: Type<IUserEntity>;
      Session: Type<ISessionEntity>;
    };
  };
  tokenOpts: {
    ttl: string;
    secret: string;
  };
}
