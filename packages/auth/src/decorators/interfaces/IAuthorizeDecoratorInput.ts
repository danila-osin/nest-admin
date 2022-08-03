import { Type } from '@nestjs/common';

export interface IAuthorizeDecoratorInput<T> {
  Policy: Type<T>;
}
