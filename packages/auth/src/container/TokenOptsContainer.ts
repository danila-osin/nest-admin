import { UndefinedTokenOption } from 'errors';
import { Container } from './Container';
import { ContainerValue } from './interfaces';
import { TokenOptsContainerKey } from './keys';

export class TokenOptsContainer {
  constructor(private readonly options = new Container<TokenOptsContainerKey, ContainerValue>()) {}

  public get<T extends ContainerValue>(key: TokenOptsContainerKey, errorOnEmpty: true): T;
  public get<T extends ContainerValue>(
    key: TokenOptsContainerKey,
    errorOnEmpty?: false
  ): T | undefined;
  public get<T extends ContainerValue>(
    key: TokenOptsContainerKey,
    errorOnEmpty?: boolean
  ): T | undefined {
    const option = this.options.get(key);

    if (!option && errorOnEmpty) throw new UndefinedTokenOption(key.toLowerCase());

    return option;
  }

  public set<T extends ContainerValue>(key: TokenOptsContainerKey, value: T): T {
    return this.options.set(key, value);
  }
}
