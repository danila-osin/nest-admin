import { ExecutionContext, Injectable } from '@nestjs/common';
import { NotRegisteredPolicyError, UnknownHandlerError } from 'errors';
import { NestAuthCoreModule } from 'NestAuthCoreModule';
import { ISessionEntity } from 'session';
import { IUserEntity } from 'user';
import { IContextData } from './interfaces';

@Injectable()
export class ContextService {
  public pullContextData(context: ExecutionContext): IContextData {
    const request = context.switchToHttp().getRequest<Request>();
    const { method } = request;

    const handler = context.getHandler();
    const Controller = context.getClass();

    const action = NestAuthCoreModule.boot.getHandlerAction(handler);
    const Policy = NestAuthCoreModule.boot.getControllerPolicy(Controller.prototype);

    const data: IContextData = {
      Controller,
      Policy,
      handler,
      action,
      method
    };

    return data;
  }

  public validateContextData(data: IContextData): asserts data is Required<IContextData> {
    if (!data.Policy) throw new NotRegisteredPolicyError(data.Controller.name);
    if (!data.action) throw new UnknownHandlerError(data.handler.name, data.Controller.name);
  }

  public pullUserFromContext(_: ExecutionContext): IUserEntity {
    const user: IUserEntity = {
      id: '1',
      login: 'user',
      username: 'danila',
      password: 'asd'
    };

    return user;
  }

  public pullSessionFromContext(_: ExecutionContext): ISessionEntity {
    const session: ISessionEntity = {
      id: '1'
    };

    return session;
  }
}
