import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ProjectEntity } from './ProjectEntity';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectRepository(ProjectEntity) private readonly _repo: Repository<ProjectEntity>,
  ) {}

  public find(input?: Partial<ProjectEntity>) {
    return this._repo.find({ where: input || {} });
  }

  public save(entity: ProjectEntity) {
    return this._repo.save(entity);
  }

  public create(input: Partial<ProjectEntity>) {
    return this._repo.create(input);
  }

  public async delete(id: string) {
    await this._repo.delete({ id });

    return { ok: true };
  }

  public async update(
    criteria: string | DeepPartial<ProjectEntity>,
    update: DeepPartial<ProjectEntity>,
  ) {
    await this._repo.update(criteria, update);

    return { ok: true };
  }
}

