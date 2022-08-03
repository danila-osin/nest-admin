import { BooleanLike, IPolicy } from '@nest-admin/auth';
import { ProjectsController } from 'projects';

export class ProjectsPolicy implements IPolicy<ProjectsController> {
  authorized(_: keyof ProjectsController): BooleanLike {
    throw new Error('Method not implemented.');
  }
  show(): BooleanLike {
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

