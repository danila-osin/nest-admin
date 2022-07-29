import { Type } from '@nestjs/common';
import { ContainerKey } from '../container';
import { Container } from '../container/Container';
import { EmptyBootEntity, throwError } from '../errors';

export class Boot {
  private entities = new Container();

  public getEntity<T extends Type<any>>(key: ContainerKey, errorOnEmpty: true): T;
  public getEntity<T extends Type<any>>(key: ContainerKey, errorOnEmpty?: false): T | undefined;
  public getEntity<T extends Type<any>>(key: ContainerKey, errorOnEmpty?: boolean): T | undefined {
    const Entity = this.entities.get<T>(key);

    (Entity === undefined && errorOnEmpty) ?? throwError(new EmptyBootEntity(key));

    return Entity;
  }

  public setEntity<Entity extends Type<any>>(key: ContainerKey, entity: Entity): Entity {
    return this.entities.set(key, entity);
  }
}
