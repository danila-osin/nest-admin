import { PATH_METADATA } from '@nestjs/common/constants';
import { Action, Fn } from '../interfaces';

export class HandlerService {
  static createAction(handler: Fn): Action {
    return {
      name: handler.name,
      path: <string>Reflect.getMetadata(PATH_METADATA, handler)
    };
  }
}
