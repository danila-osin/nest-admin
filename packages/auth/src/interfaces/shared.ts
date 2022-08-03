import { Observable } from 'rxjs';

export type Fn<P extends any[] = any[], R = any> = ((...args: P) => R) | Function;
export type ObjLiteral<K extends string = string, V = any> = Record<K, V>;
export type BooleanLike = boolean | Promise<boolean> | Observable<boolean>;

export interface MethodDescriptor<T extends Fn = Fn> {
  value?: T;
}
