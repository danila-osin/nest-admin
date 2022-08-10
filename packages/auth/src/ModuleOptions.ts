import { DeepPartial, INestAuthModuleOptions } from 'interfaces';
import { deepMerge } from 'utils';

export class ModuleOptions {
  static DEFAULT_MODULE_OPTIONS: DeepPartial<INestAuthModuleOptions> = {
    tokenOptions: {
      ttl: '15m'
    }
  };

  static defaultModuleOptions() {
    return this.DEFAULT_MODULE_OPTIONS;
  }

  static applyModuleOptions(userModuleOptions: INestAuthModuleOptions): INestAuthModuleOptions {
    return deepMerge(this.DEFAULT_MODULE_OPTIONS, userModuleOptions);
  }
}
