import { HandlerUndefinedError } from 'errors';
import { HandlerService } from 'handler';
import { NestAuthCoreModule } from 'NestAuthCoreModule';

import { IAuthorizeActionDecorator } from './interfaces';

export const AuthorizeAction: IAuthorizeActionDecorator = (action) => {
  console.log('>>> Action registration:', action);

  return (controllerProto, handlerName, desc) => {
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
