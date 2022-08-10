import { ExecutionContext, Injectable } from '@nestjs/common';
import { ContextService } from 'context';
import { BooleanLike } from 'interfaces';

@Injectable()
export class AuthorizeService {
  constructor(private readonly contextService: ContextService) {}

  public authorize(context: ExecutionContext): BooleanLike {
    const contextData = this.contextService.pullContextData(context);

    this.contextService.validateContextData(contextData);

    const { Policy, action } = contextData;
    const user = this.contextService.pullUserFromContext(context);

    return new Policy().authorized(action.mapTo || action.name, user);
  }
}
