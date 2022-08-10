export class EmptyContainerEntityError extends Error {
  constructor(key: keyof any) {
    super(`Container has no entity by specified key(${key.toString()})`);
  }
}
