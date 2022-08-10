import { containers, EntityContainerKey } from 'container';
import { EntityManager, Repository } from 'typeorm';

export const buildRepositoryClass = (entityKey: EntityContainerKey) => {
  return class<T> {
    repo: Repository<T>;

    constructor(em: EntityManager) {
      const entity = containers.entity.get(entityKey, true);
      this.repo = em.getRepository(entity);
    }
  };
};
