export class UnknownHandlerError extends Error {
  constructor(handlerName: string, controllerName: string) {
    super(
      `Unknown handler "${handlerName}" of "${controllerName}". Probably you modified it on runtime`
    );
  }
}
