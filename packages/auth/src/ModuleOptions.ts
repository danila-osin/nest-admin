import { INestAuthModuleOptions, INestAuthModuleUserOptions } from 'interfaces';

export class ModuleOptions {
  static DEFAULT_MODULE_OPTIONS = {
    api: 'rest' as const,
    tokenOptions: {
      ttl: '15m',
      secret: '_NEST_AUTH_TOKEN_SECRET_'
    }
  };

  static defaultModuleOptions() {
    return this.DEFAULT_MODULE_OPTIONS;
  }

  static applyModuleOptions(userModuleOptions: INestAuthModuleUserOptions): INestAuthModuleOptions {
    return {
      ...this.DEFAULT_MODULE_OPTIONS,
      ...userModuleOptions,
      tokenOptions: {
        ...this.DEFAULT_MODULE_OPTIONS.tokenOptions,
        ...userModuleOptions.tokenOptions
      }
    };
  }
}
