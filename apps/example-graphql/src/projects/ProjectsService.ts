import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { ProjectEntity } from './ProjectEntity';
import { ProjectsRepository } from './ProjectsRepository';

@Injectable()
export class ProjectsService {
  constructor(private readonly repository: ProjectsRepository) {}

  public async get(input?: Partial<ProjectEntity>) {
    return await this.repository.find(input);
  }

  public async create(input: Partial<ProjectEntity>) {
    const user = this.repository.create(input);

    return this.repository.save(user);
  }

  public async delete(idOrEntity: string | ProjectEntity) {
    return await this.repository.delete(
      typeof idOrEntity === 'string' ? idOrEntity : idOrEntity.id,
    );
  }

  public update(
    criteria: string | DeepPartial<ProjectEntity>,
    update: DeepPartial<ProjectEntity>,
  ) {
    return this.repository.update(criteria, update);
  }
}

