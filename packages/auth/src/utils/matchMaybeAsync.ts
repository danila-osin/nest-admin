import { isPromise } from 'assertions';
import { MaybeAsync } from 'interfaces';
import { isObservable, Observable } from 'rxjs';

type MatchMaybeAsync<T, V, P, O> = {
  value: (value: T) => V;
  promise: (value: Promise<T>) => P;
  observable: (value: Observable<T>) => O;
};

export const matchMaybeAsync = <T, V, P, O>(
  value: MaybeAsync<T>,
  match: MatchMaybeAsync<T, V, P, O>
): V | P | O => {
  if (isPromise(value)) return match['promise'](value);

  if (isObservable(value)) return match['observable'](value);

  return match['value'](value);
};
