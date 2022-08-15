import { PATH_METADATA } from '@nestjs/common/constants';
import { Action, Fn } from 'interfaces';

export class HandlerService {
  static getPath(handler: Fn): string {
    return <string>Reflect.getMetadata(PATH_METADATA, handler) || '';
  }

  static createAction(handler: Fn): Action {
    return {
      name: handler.name,
      path: this.getPath(handler)
    };
  }
}
