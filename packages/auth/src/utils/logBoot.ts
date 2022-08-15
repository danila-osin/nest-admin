import { ControllerService } from 'controller';
import { NestAuthCoreModule } from 'NestAuthCoreModule';
import { Debugger } from 'debug';
import { MethodDescriptor, ObjLiteral } from 'interfaces';

export const LogBoot = (logger: Debugger) => {
  return (_: ObjLiteral, __: string, desc: MethodDescriptor) => {
    const originalFn = desc.value;

    desc.value = (...args: any[]) => {
      const controllers = NestAuthCoreModule.boot.getControllers();

      for (const Controller of controllers) {
        logger(`-----------------------`);
        logger(`${Controller.name}:`);
        logger('\t\tPath: %o', NestAuthCoreModule.boot.getControllerPath(Controller.prototype));
        logger(
          '\t\tPolicy: %o',
          NestAuthCoreModule.boot.getControllerPolicy(Controller.prototype)?.name
        );

        const actions = ControllerService.getHandlers(Controller).map((handler) => {
          return [handler.name, NestAuthCoreModule.boot.getHandlerAction(handler)] as const;
        });

        logger('\t\tActions: ');
        actions.forEach(([handlerName, action]) => {
          logger(
            `\t\t\t${handlerName}${action?.mapTo ? `(${action?.mapTo})` : ''}${
              action?.path ? ':' : ''
            }`,
            action?.path
          );
        });
      }

      return originalFn?.(...args);
    };
  };
};
