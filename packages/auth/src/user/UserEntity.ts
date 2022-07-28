import { ClassType } from '../interfaces';
import { IUserEntity } from './interfaces';

export let UserEntity: ClassType<IUserEntity>;

export const setUserEntity = (UserEntityClass: ClassType<IUserEntity>) => {
  UserEntity = UserEntityClass;
};

