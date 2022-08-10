import { Injectable } from '@nestjs/common';
import { EntityContainerKey } from 'container';
import { buildRepositoryClass } from 'repository';
import { from, Observable } from 'rxjs';
import { EntityManager } from 'typeorm';
import { IUserEntity } from './interfaces';

@Injectable()
export class UserRepository extends buildRepositoryClass(
  EntityContainerKey.USER_ENTITY
)<IUserEntity> {
  constructor(em: EntityManager) {
    super(em);
  }

  public findOne(query: Partial<IUserEntity>): Observable<IUserEntity | null> {
    return from(this.repo.findOne({ where: query }));
  }

  public create(query: Partial<IUserEntity>): IUserEntity {
    return this.repo.create(query);
  }

  public save(entity: IUserEntity): Observable<IUserEntity> {
    return from(this.repo.save(entity));
  }
}
