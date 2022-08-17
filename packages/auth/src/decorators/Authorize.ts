import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { isPolicy } from 'assertions';
import { Authorizer } from 'authorizer';
import { ControllerService } from 'controller';
import debug from 'debug';
import { SpecifiedClassIsNotPolicyError } from 'errors';

import { NestAuthCoreModule } from 'NestAuthCoreModule';
import { Observable } from 'rxjs';
import { IAuthorizeDecorator } from './interfaces';

@Injectable()
class AuthorizeGuard implements CanActivate {
  constructor(private readonly authorizer: Authorizer) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    return this.authorizer.authorize(context);
  }
}

export const Authorize: IAuthorizeDecorator = (input) => {
  const { Policy } = input;

  if (!isPolicy(Policy)) throw new SpecifiedClassIsNotPolicyError(Policy.name);
  else
    return (Controller) => {
      debug('Boot:policy')('Registration: %o -> %o', Policy.name, Controller.name);
      const controllerData = ControllerService.createData(Controller, Policy);
      NestAuthCoreModule.boot.saveControllerData(controllerData);

      UseGuards(AuthorizeGuard)(Controller);
    };
};
