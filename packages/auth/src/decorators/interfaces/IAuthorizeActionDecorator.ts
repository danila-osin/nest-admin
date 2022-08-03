import { MethodDescriptor, ObjLiteral } from '../../interfaces';

export interface IAuthorizeActionDecorator {
  (action: string): (
    controllerProto: ObjLiteral,
    handlerName: string,
    descriptor: MethodDescriptor
  ) => void;
}
