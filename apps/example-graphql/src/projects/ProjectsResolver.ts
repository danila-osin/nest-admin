import { Authorize, AuthorizeAction } from '@nest-admin/auth';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SuccessResponse } from 'models';
import { CreateProjectModel, ProjectModel, UpdateProjectModel } from './models';
import { ProjectsPolicy } from './ProjectsPolicy';
import { ProjectsService } from './ProjectsService';

@Authorize({ Policy: ProjectsPolicy })
@Resolver()
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => [ProjectModel])
  public get() {
    return this.projectsService.get();
  }

  @AuthorizeAction('one')
  @Query(() => ProjectModel)
  public async getOne(@Args('id', { type: () => ID }) id: string) {
    return (await this.projectsService.get({ id }))?.[0];
  }

  @Mutation(() => ProjectModel)
  public create(@Args('input') input: CreateProjectModel) {
    return this.projectsService.create(input);
  }

  @Mutation(() => SuccessResponse)
  public delete(@Args('id', { type: () => ID }) id: string) {
    return this.projectsService.delete(id);
  }

  @Mutation(() => SuccessResponse)
  public update(@Args('input') { id, ...update }: UpdateProjectModel) {
    return this.projectsService.update(id, update);
  }
}

