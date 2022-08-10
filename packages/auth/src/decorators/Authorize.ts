import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { isPolicy } from 'assertions';
import { AuthorizeService } from 'authorize';
import { ControllerService } from 'controller';
import { SpecifiedClassIsNotPolicyError } from 'errors';

import { BooleanLike } from 'interfaces';
import { NestAuthCoreModule } from 'NestAuthCoreModule';
import { IAuthorizeDecorator } from './interfaces';

@Injectable()
class AuthorizeGuard implements CanActivate {
  constructor(private readonly authorizeService: AuthorizeService) {}

  canActivate(context: ExecutionContext): BooleanLike {
    return this.authorizeService.authorize(context);
  }
}

export const Authorize: IAuthorizeDecorator = (input) => {
  const { Policy } = input;

  if (!isPolicy(Policy)) throw new SpecifiedClassIsNotPolicyError(Policy.name);
  else
    return (Controller) => {
      const controllerData = ControllerService.createData(Controller, Policy);
      NestAuthCoreModule.boot.saveControllerData(controllerData);

      UseGuards(AuthorizeGuard)(Controller);
    };
};
