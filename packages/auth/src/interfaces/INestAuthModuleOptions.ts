import { Type } from '@nestjs/common';
import { ISessionEntity } from 'session';
import { IUserEntity } from 'user';

export type INestAuthModuleOptionsDatabaseType = 'typeorm';

export type INestModuleEntities = {
  User: Type<IUserEntity>;
  Session: Type<ISessionEntity>;
};

export type INestAuthTokenOptions = {
  ttl: string;
  secret: string;
};

export interface INestAuthModuleOptions {
  database: {
    type: INestAuthModuleOptionsDatabaseType;
    entities: INestModuleEntities;
  };
  tokenOptions: INestAuthTokenOptions;
}
