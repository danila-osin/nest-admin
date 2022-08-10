import { ExecutionContext, Injectable } from '@nestjs/common';
import { ContextService } from 'context';
import { from, mergeMap, Observable, of } from 'rxjs';
import { matchMaybeAsync } from 'utils';

@Injectable()
export class AuthorizeService {
  constructor(private readonly contextService: ContextService) {}

  public authorize(context: ExecutionContext): Observable<boolean> {
    const contextData = this.contextService.pullContextData(context);

    const { Policy, action } = contextData;

    return this.contextService.pullUserFromContext(context).pipe(
      mergeMap((user) => {
        const isAuthorized = new Policy().authorized(action.mapTo || action.name, user);

        return matchMaybeAsync(isAuthorized, {
          observable: (value) => value,
          promise: (value) => from(value),
          value: (value) => of(value)
        });
      })
    );
  }
}
