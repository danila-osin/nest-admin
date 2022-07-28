export type INestAuthModuleOptionsDatabaseType = 'typeorm';

export interface INestAuthModuleOptions {
  database: {
    type: INestAuthModuleOptionsDatabaseType;
  };
}

