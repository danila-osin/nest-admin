import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ITokenPayload } from 'auth';
import { NEST_AUTH_API } from 'const';
import {
  ContextRequestIsUndefinedError,
  NotRegisteredPolicyError,
  UnknownHandlerError
} from 'errors';
import { IncomingMessage } from 'http';
import { INestAuthModuleOptionsApi } from 'interfaces';
import { NestAuthCoreModule } from 'NestAuthCoreModule';
import { Observable } from 'rxjs';
import { ISessionEntity } from 'session';
import { TokenService } from 'token';
import { IUserEntity, UserService } from 'user';
import { IContextData } from './interfaces';

@Injectable()
export class ContextService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    @Inject(NEST_AUTH_API) private readonly api: INestAuthModuleOptionsApi
  ) {}

  public pullContextData(context: ExecutionContext): Required<IContextData> {
    const request = this.getRequestFromContext(context);
    const { method = 'GET' } = request;

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

    this.validateContextData(data);

    return data;
  }

  public validateContextData(data: IContextData): asserts data is Required<IContextData> {
    if (!data.Policy) throw new NotRegisteredPolicyError(data.Controller.name);
    if (!data.action) throw new UnknownHandlerError(data.handler.name, data.Controller.name);
  }

  public pullUserFromContext(context: ExecutionContext): Observable<IUserEntity | undefined> {
    const token = this.tokenService.getValidTokenFromRequest(this.getRequestFromContext(context));

    const { userId: id } = this.tokenService.verify<ITokenPayload>(token);

    return this.userService.find(id);
  }

  public pullSessionFromContext(_: ExecutionContext): ISessionEntity {
    throw new Error('Method not implemented');
  }

  private getRequestFromContext(context: ExecutionContext): IncomingMessage {
    const match: Record<INestAuthModuleOptionsApi, () => IncomingMessage | undefined> = {
      graphql: () => GqlExecutionContext.create(context)?.getContext()?.req,
      rest: () => context.switchToHttp()?.getRequest()
    };

    const request = match[this.api]();

    if (!request) throw new ContextRequestIsUndefinedError();

    return request;
  }
}
