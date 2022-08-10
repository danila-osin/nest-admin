import { Type } from '@nestjs/common';
import { Action, Fn, IPolicy } from 'interfaces';

export interface IContextData {
  Controller: Type;
  Policy?: Type<IPolicy>;
  handler: Fn;
  method: string;
  action?: Action;
}
