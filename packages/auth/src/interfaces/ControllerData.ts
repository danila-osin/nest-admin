import { Type } from '@nestjs/common';
import { HandlerActionPair } from './HandlerActionPair';
import { IPolicy } from './IPolicy';

export interface ControllerData {
  Controller: Type;
  Policy: Type<IPolicy>;
  path?: string;
  handlerActionPairs: HandlerActionPair[];
}
