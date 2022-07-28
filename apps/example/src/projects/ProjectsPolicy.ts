import { BooleanLike, IPolicy } from '@nest-admin/auth';
import { ProjectsController } from './ProjectsController';

export class ProjectsPolicy implements IPolicy<ProjectsController> {
  public authorized(action: keyof ProjectsController): BooleanLike {
    this[action]();
    throw new Error('Method not implemented.');
  }

  public show(): BooleanLike {
    throw new Error('Method not implemented.');
  }

  public get(): BooleanLike {
    throw new Error('Method not implemented.');
  }

  public getOne(): BooleanLike {
    throw new Error('Method not implemented.');
  }

  public create(): BooleanLike {
    throw new Error('Method not implemented.');
  }

  public delete(): BooleanLike {
    throw new Error('Method not implemented.');
  }

  public update(): BooleanLike {
    throw new Error('Method not implemented.');
  }
}

