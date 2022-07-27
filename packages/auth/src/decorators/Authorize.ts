import {
  applyDecorators,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  SetMetadata,
  UseInterceptors,
} from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { POLICY_METADATA_KEY } from '../constants';
import { ClassType, IPolicy } from '../interfaces';
import { Observable } from 'rxjs';

export type AuthorizeDecoratorInput<T> = {
  Policy: ClassType<T>;
};

@Injectable()
class AuthorizeInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    const { method } = request;

    const handler = context.getHandler();
    const Controller = context.getClass();
    const Policy = <ClassType<IPolicy>>Reflect.getMetadata(POLICY_METADATA_KEY, Controller);

    const controllerPath = <string>Reflect.getMetadata(PATH_METADATA, Controller);
    const handlerPath = <string>Reflect.getMetadata(PATH_METADATA, handler);

    console.log(method, controllerPath, handlerPath);
    console.log('Controller:', Controller);
    console.log('Policy:', Policy);

    return next.handle();
  }
}

export const Authorize = <T>(input: AuthorizeDecoratorInput<T>) => {
  return applyDecorators(
    UseInterceptors(AuthorizeInterceptor),
    SetMetadata('policy', input.Policy),
  );
};

