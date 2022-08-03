import { BooleanLike } from './shared';

export type PolicyMethods<T> = {
  [method in keyof T]: () => BooleanLike;
};

export type PolicyAuthorized<T> = {
  authorized(action: keyof T): BooleanLike;
};

export type PolicyShow = {
  show(): BooleanLike;
};

export type IPolicy<T = any> = PolicyAuthorized<T> & PolicyShow & PolicyMethods<T>;
