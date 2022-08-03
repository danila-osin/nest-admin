export class HandlerUndefinedError extends Error {
  constructor(handlerName: string, controllerName: string) {
    super(`Handler "${handlerName}" of "${controllerName}" is undefined"`);
  }
}
