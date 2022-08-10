import { ExecutionContext, Injectable } from '@nestjs/common';
import { ITokenPayload } from 'auth';
import { NotRegisteredPolicyError, UnknownHandlerError } from 'errors';
import { IncomingMessage } from 'http';
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
    private readonly tokenService: TokenService
  ) {}

  public pullContextData(context: ExecutionContext): IContextData {
    const request = context.switchToHttp().getRequest<IncomingMessage>();
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

    return data;
  }

  public validateContextData(data: IContextData): asserts data is Required<IContextData> {
    if (!data.Policy) throw new NotRegisteredPolicyError(data.Controller.name);
    if (!data.action) throw new UnknownHandlerError(data.handler.name, data.Controller.name);
  }

  public pullUserFromContext(context: ExecutionContext): Observable<IUserEntity | undefined> {
    const token = this.tokenService.getTokenFromRequest(context.switchToHttp().getRequest());
    this.tokenService.validateToken(token);

    const { userId: id } = this.tokenService.verify<ITokenPayload>(token);

    return this.userService.findOne({ id });
  }

  public pullSessionFromContext(_: ExecutionContext): ISessionEntity {
    return { id: '1' };
  }
}
