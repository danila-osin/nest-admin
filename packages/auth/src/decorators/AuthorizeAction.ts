import debug from 'debug';
import { HandlerUndefinedError } from 'errors';
import { HandlerService } from 'handler';
import { NestAuthCoreModule } from 'NestAuthCoreModule';

import { IAuthorizeActionDecorator } from './interfaces';

export const AuthorizeAction: IAuthorizeActionDecorator = (action) => {
  return (controllerProto, handlerName, desc) => {
    debug('Boot:action')(
      'Registration: %o -> %o',
      `${controllerProto['constructor']['name']}.${handlerName}`,
      `${action}`
    );
    const handler = desc.value;

    if (!handler) throw new HandlerUndefinedError(handlerName, controllerProto.constructor.name);

    NestAuthCoreModule.boot.setHandlerActions([
      [
        handler,
        {
          mapTo: action,
          ...HandlerService.createAction(handler)
        }
      ]
    ]);
  };
};
