import { BooleanLike, IPolicy } from '@nest-admin/auth';
import { UsersController } from './UsersController';

export class UsersPolicy implements IPolicy<UsersController> {
  public get(): BooleanLike {
    return true;
  }
  public getOne(): BooleanLike {
    return true;
  }
  public create(): BooleanLike {
    return true;
  }
  public delete(): BooleanLike {
    return true;
  }
  authorized(action: keyof UsersController): BooleanLike {
    console.log(action);
    return true;
  }
  show(): BooleanLike {
    return true;
  }
}

