import { ContainerKey, ContainerValue } from './interfaces';

export class Container<
  TKey extends ContainerKey = ContainerKey,
  TValue extends ContainerValue = ContainerValue
> {
  private store: Map<TKey, TValue> = new Map();

  public set<V extends TValue = TValue>(key: TKey, value: V): V {
    this.store.set(key, value);

    return value;
  }

  public get<ReturnType extends TValue>(key: TKey): ReturnType | undefined {
    return this.store.get(key) as ReturnType | undefined;
  }

  public has(key: TKey): boolean {
    return this.store.has(key);
  }
}
