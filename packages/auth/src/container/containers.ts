import { EntityContainer } from './EntityContainer';
import { TokenOptsContainer } from './TokenOptsContainer';

export const containers = {
  entity: new EntityContainer(),
  tokenOpts: new TokenOptsContainer()
};
