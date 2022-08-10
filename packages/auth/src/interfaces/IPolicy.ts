import { IUserEntity } from 'user';
import { BooleanLike } from './shared';

export type PolicyMethods<T, U extends IUserEntity> = {
  [method in keyof T]: (user?: U) => BooleanLike;
};

export type PolicyAuthorized<T, U extends IUserEntity> = {
  authorized(action: keyof T, user?: U): BooleanLike;
};

export type PolicyShow = {
  show(): BooleanLike;
};

export type IPolicy<T = any, U extends IUserEntity = IUserEntity> = PolicyAuthorized<T, U> &
  PolicyShow &
  PolicyMethods<T, U>;
