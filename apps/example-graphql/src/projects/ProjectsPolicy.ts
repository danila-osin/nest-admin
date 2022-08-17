import { BooleanLike, IPolicy } from '@nest-admin/auth';
import { Injectable } from '@nestjs/common';
import { ProjectsResolver } from './ProjectsResolver';
import { ProjectsService } from './ProjectsService';
import { UserEntity } from 'users';

@Injectable()
export class ProjectsPolicy implements IPolicy<ProjectsResolver, UserEntity> {
  constructor(private readonly projectsService: ProjectsService) {}

  public authorized(action: keyof ProjectsResolver, user?: UserEntity): BooleanLike {
    console.log(`ProjectPolicyAction called: ${action}`);
    console.log('>> Projects list', this.projectsService.get());

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

