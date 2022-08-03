import { Type } from '@nestjs/common';
import { IAuthorizeDecoratorInput } from './IAuthorizeDecoratorInput';

export interface IAuthorizeDecorator {
  <T>(input: IAuthorizeDecoratorInput<T>): (Controller: Type) => void;
}
