import { Type } from '@nestjs/common';
import { INestModuleEntities, EntitiesKey } from 'interfaces';
import { EntityManager, Repository } from 'typeorm';

export const buildRepositoryClass = (entityKey: EntitiesKey) => {
  return class<T> {
    repo: Repository<T>;

    constructor(em: EntityManager, entities: INestModuleEntities) {
      const Entity = <Type>entities[entityKey];

      this.repo = em.getRepository(Entity);
    }
  };
};
