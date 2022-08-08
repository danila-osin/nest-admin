import { ControllerService } from 'controller';
import { NestAuthCoreModule } from 'NestAuthCoreModule';

export const logBoot = (): void => {
  const controllers = NestAuthCoreModule.boot.getControllers();

  for (const Controller of controllers) {
    console.log(`${Controller.name}:`);
    console.log('\tPath: ', NestAuthCoreModule.boot.getControllerPath(Controller.prototype));
    console.log(
      '\tPolicy: ',
      NestAuthCoreModule.boot.getControllerPolicy(Controller.prototype)?.name
    );

    const actions = ControllerService.getHandlers(Controller).map((handler) => {
      return [handler.name, NestAuthCoreModule.boot.getHandlerAction(handler)] as const;
    });

    console.log('\tActions: ');
    actions.forEach(([handlerName, action]) => {
      console.log(`\t\t${handlerName}${action?.mapTo ? `(${action?.mapTo})` : ''}:`, action?.path);
    });
  }
};
