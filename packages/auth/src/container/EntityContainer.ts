import { Type } from '@nestjs/common';
import { EmptyContainerEntityError } from 'errors';
import { Container } from './Container';
import { EntityContainerKey } from './keys';

export class EntityContainer {
  constructor(private readonly entities = new Container<EntityContainerKey, Type>()) {}

  public get<T extends Type>(key: EntityContainerKey, errorOnEmpty: true): T;
  public get<T extends Type>(key: EntityContainerKey, errorOnEmpty?: false): T | undefined;
  public get<T extends Type>(key: EntityContainerKey, errorOnEmpty?: boolean): T | undefined {
    const Entity = this.entities.get<T>(key);

    if (!Entity && errorOnEmpty) throw new EmptyContainerEntityError(key);

    return Entity;
  }

  public set<Entity extends Type>(key: EntityContainerKey, entity: Entity): Entity {
    return this.entities.set(key, entity);
  }
}
