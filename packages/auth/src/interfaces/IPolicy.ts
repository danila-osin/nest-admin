import { IUserEntity } from 'user';
import { BooleanLike } from './shared';

export type PolicyMethods<T, U extends IUserEntity> = {
  [method in keyof T]: (user: U) => BooleanLike;
};

export type PolicyAuthorized<T> = {
  authorized(action: keyof T, user: IUserEntity): BooleanLike;
};

export type PolicyShow = {
  show(): BooleanLike;
};

export type IPolicy<T = any, U extends IUserEntity = IUserEntity> = PolicyAuthorized<T> &
  PolicyShow &
  PolicyMethods<T, U>;
