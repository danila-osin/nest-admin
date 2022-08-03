import { Type } from '@nestjs/common';
import { EmptyBootEntityError, throwError } from '../errors';
import { Container } from './Container';
import { ContainerKey } from './interfaces';

export class EntityContainer {
  constructor(private readonly entities = new Container<ContainerKey, Type>()) {}

  public get<T extends Type>(key: ContainerKey, errorOnEmpty: true): T;
  public get<T extends Type>(key: ContainerKey, errorOnEmpty?: false): T | undefined;
  public get<T extends Type>(key: ContainerKey, errorOnEmpty?: boolean): T | undefined {
    const Entity = this.entities.get<T>(key);

    (Entity === undefined && errorOnEmpty) ?? throwError(new EmptyBootEntityError(key));

    return Entity;
  }

  public set<Entity extends Type>(key: ContainerKey, entity: Entity): Entity {
    return this.entities.set(key, entity);
  }
}
