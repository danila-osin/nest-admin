import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  SetMetadata,
  Type,
  UseInterceptors
} from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { Observable } from 'rxjs';
import { POLICY_METADATA_KEY } from '../constants';
import { IPolicy } from '../interfaces';

export type AuthorizeDecoratorInput<T> = {
  Policy: Type<T>;
};

@Injectable()
class AuthorizeInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    const { method } = request;

    const handler = context.getHandler();
    const Controller = context.getClass();
    const Policy = <Type<IPolicy>>Reflect.getMetadata(POLICY_METADATA_KEY, Controller);

    const controllerPath = <string>Reflect.getMetadata(PATH_METADATA, Controller);
    const handlerPath = <string>Reflect.getMetadata(PATH_METADATA, handler);

    console.log(method, controllerPath, handlerPath);
    console.log('Controller:', Controller);
    console.log('Policy:', Policy);

    return next.handle();
  }
}

export const Authorize = <T>(input: AuthorizeDecoratorInput<T>) => {
  return (Controller => {
    UseInterceptors(AuthorizeInterceptor)(Controller);
    SetMetadata('policy', input.Policy)(Controller);
  }) as ClassDecorator;
};
