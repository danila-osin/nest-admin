export class EmptyBootEntity extends Error {
  constructor(key: keyof any) {
    super(`Boot has no entity by specified key(${key.toString()})`);
  }
}
