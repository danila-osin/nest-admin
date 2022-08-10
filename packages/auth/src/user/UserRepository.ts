import { Inject, Injectable } from '@nestjs/common';
import { NEST_AUTH_ENTITIES } from 'const';
import { INestModuleEntities } from 'interfaces';
import { buildRepositoryClass } from 'repository';
import { from, map, Observable } from 'rxjs';
import { EntityManager } from 'typeorm';
import { IUserEntity } from './interfaces';

@Injectable()
export class UserRepository extends buildRepositoryClass('User')<IUserEntity> {
  constructor(em: EntityManager, @Inject(NEST_AUTH_ENTITIES) entities: INestModuleEntities) {
    super(em, entities);
  }

  public findOne(query: Partial<IUserEntity>): Observable<IUserEntity | undefined> {
    return from(this.repo.findOne({ where: query })).pipe(map((user) => user || undefined));
  }

  public create(query: Partial<IUserEntity>): IUserEntity {
    return this.repo.create(query);
  }

  public save(entity: Partial<IUserEntity>): Observable<IUserEntity> {
    return from(this.repo.save(entity));
  }
}
