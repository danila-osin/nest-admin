import { Container } from './Container';
import { ContainerValue } from './interfaces';
import { TokenOptsContainerKey } from './keys';

export class TokenOptsContainer {
  constructor(private readonly options = new Container<TokenOptsContainerKey, ContainerValue>()) {}

  public get<T extends ContainerValue>(key: TokenOptsContainerKey): T | undefined {
    const option = this.options.get(key);

    return option;
  }

  public set<T extends ContainerValue>(key: TokenOptsContainerKey, value: T): T {
    return this.options.set(key, value);
  }
}
