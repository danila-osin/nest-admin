import { BooleanLike, IPolicy } from '@nest-admin/auth';
import { ProjectsResolver } from 'projects';
import { UserEntity } from 'users';

export class ProjectsPolicy implements IPolicy<ProjectsResolver, UserEntity> {
  public authorized(action: keyof ProjectsResolver, user?: UserEntity): BooleanLike {
    console.log(`ProjectPolicyAction called: ${action}`);

    return this[action] ? this[action](user) : this.show();
  }

  public show(): BooleanLike {
    console.log('Show called');

    return true;
  }

  public get(user?: UserEntity): BooleanLike {
    console.log(user);
    return true;
  }

  public getOne(user?: UserEntity): BooleanLike {
    console.log(user);
    return true;
  }

  public create(user?: UserEntity): BooleanLike {
    console.log(user);
    return true;
  }

  public delete(user?: UserEntity): BooleanLike {
    console.log(user);
    return true;
  }

  public update(user?: UserEntity): BooleanLike {
    console.log(user);
    return true;
  }
}

