import {
  INestAuthModuleOptionsApi,
  INestAuthModuleOptionsDatabaseType,
  INestModuleEntities
} from './INestAuthModuleOptions';

export type INestAuthTokenUserOptions = {
  ttl?: string;
  secret?: string;
};

export interface INestAuthModuleUserOptions {
  api?: INestAuthModuleOptionsApi;
  database: {
    type: INestAuthModuleOptionsDatabaseType;
    entities: INestModuleEntities;
  };
  tokenOptions?: INestAuthTokenUserOptions;
}
