import { Type } from '@nestjs/common';

import { Container } from 'container';
import { Action, ControllerData, Fn, HandlerActionPair, IPolicy, ObjLiteral } from 'interfaces';

export class Boot {
  private controllers: Type[] = [];
  private controllerPolicies = new Container<ObjLiteral, Type>();
  private controllerPaths = new Container<ObjLiteral, string>();
  private handlerActions = new Container<Fn, Action>();

  public setControllerPolicy(controllerProto: ObjLiteral, Policy: Type): Type<IPolicy> {
    return this.controllerPolicies.set(controllerProto, Policy);
  }

  public getControllerPolicy(controllerProto: ObjLiteral): Type<IPolicy> | undefined {
    return this.controllerPolicies.get<Type<IPolicy>>(controllerProto);
  }

  public setControllerPath(controllerProto: ObjLiteral, path: string | undefined): string {
    return this.controllerPaths.set(controllerProto, path || '');
  }

  public getControllerPath(controllerProto: ObjLiteral): string | undefined {
    return this.controllerPaths.get(controllerProto);
  }

  public saveController<T extends Type = Type>(Controller: T): T {
    this.controllers.push(Controller);

    return Controller;
  }

  public getControllers(): Type[] {
    return this.controllers;
  }

  public setHandlerActions(pairs: HandlerActionPair[]): void {
    for (const [handler, action] of pairs) {
      !this.handlerActions.has(handler) && this.handlerActions.set(handler, action);
    }
  }

  public getHandlerAction(handler: Fn): Action | undefined {
    return this.handlerActions.get(handler);
  }

  public saveControllerData(data: ControllerData): void {
    this.setHandlerActions(data.handlerActionPairs);
    this.saveController(data.Controller);
    this.setControllerPolicy(data.Controller.prototype, data.Policy);
    this.setControllerPath(data.Controller.prototype, data.path);
  }
}
