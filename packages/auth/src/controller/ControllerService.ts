import { Type } from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { HandlerService } from '../handler';
import { ControllerData, Fn, IPolicy } from '../interfaces';
import { getProtoFunctionNames } from '../utils';

export class ControllerService {
  static getHandlerNames(Controller: Type): string[] {
    return getProtoFunctionNames(Controller);
  }

  static getHandlers(Controller: Type): Fn[] {
    const proto = Controller.prototype;

    return this.getHandlerNames(Controller).map((handlerName) => proto[handlerName]);
  }

  static createData(Controller: Type, Policy: Type<IPolicy>): ControllerData {
    return {
      Controller,
      Policy,
      path: <string>Reflect.getMetadata(PATH_METADATA, Controller),
      handlerActionPairs: this.getHandlers(Controller).map((handler) => [
        handler,
        HandlerService.createAction(handler)
      ])
    };
  }
}
