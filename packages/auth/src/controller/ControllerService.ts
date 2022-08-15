import { Type } from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { HandlerService } from 'handler';
import { ControllerData, Fn, IPolicy } from 'interfaces';
import { getProtoFunctionNames } from 'utils';

export class ControllerService {
  static getHandlerNames(Controller: Type): string[] {
    return getProtoFunctionNames(Controller);
  }

  static getPath(Controller: Type): string {
    const { name } = Controller;
    const nameLength = name.length;

    const path = (
      name.endsWith('Controller')
        ? name.slice(0, nameLength - 10)
        : name.endsWith('Resolver')
        ? name.slice(0, nameLength - 8)
        : ''
    ).toLowerCase();

    return <string>Reflect.getMetadata(PATH_METADATA, Controller) || path;
  }

  static getHandlers(Controller: Type): Fn[] {
    const proto = Controller.prototype;

    return this.getHandlerNames(Controller).map((handlerName) => proto[handlerName]);
  }

  static createData(Controller: Type, Policy: Type<IPolicy>): ControllerData {
    return {
      Controller,
      Policy,
      path: this.getPath(Controller),
      handlerActionPairs: this.getHandlers(Controller).map((handler) => [
        handler,
        HandlerService.createAction(handler)
      ])
    };
  }
}
