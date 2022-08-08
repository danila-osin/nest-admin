import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { isPolicy } from 'assertions';
import { ControllerService } from 'controller';
import {
  NotRegisteredPolicyError,
  SpecifiedClassIsNotPolicyError,
  UnknownHandlerError
} from 'errors';

import { NestAuthCoreModule } from 'NestAuthCoreModule';
import { IAuthorizeDecorator } from './interfaces';

@Injectable()
class AuthorizeInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('>>> Intercepting');
    const request: Request = context.switchToHttp().getRequest();

    const { method } = request;

    const handler = context.getHandler();
    const Controller = context.getClass();

    const action = NestAuthCoreModule.boot.getHandlerAction(handler);
    const Policy = NestAuthCoreModule.boot.getControllerPolicy(Controller.prototype);

    if (!Policy) throw new NotRegisteredPolicyError(Controller.name);
    if (!action) throw new UnknownHandlerError(handler.name, Controller.name);

    console.log(method);

    return next.handle();
  }
}

export const Authorize: IAuthorizeDecorator = (input) => {
  console.log('>>> Policy registration:', input.Policy.name);

  const { Policy } = input;

  if (!isPolicy(Policy)) throw new SpecifiedClassIsNotPolicyError(Policy.name);
  else
    return (Controller) => {
      const controllerData = ControllerService.createData(Controller, Policy);
      NestAuthCoreModule.boot.saveControllerData(controllerData);

      UseInterceptors(AuthorizeInterceptor)(Controller);
    };
};
