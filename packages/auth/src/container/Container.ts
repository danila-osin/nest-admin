import { ContainerKey, ContainerValue } from './interfaces';

export class Container {
  private store: Record<ContainerKey, ContainerValue> = {};

  public set<T extends ContainerValue = ContainerValue>(key: ContainerKey, value: T): T {
    return (this.store[key] = value);
  }

  public get<ReturnType>(key: ContainerKey): ReturnType | undefined {
    return this.store[key];
  }
}
