import { Type } from '@nestjs/common';

export const getProtoFunctionNames = (Class: Type, filterConstructor = true): string[] => {
  return Object.getOwnPropertyNames(Class.prototype).filter((name) => {
    if (filterConstructor) return name !== 'constructor';

    return true;
  });
};
