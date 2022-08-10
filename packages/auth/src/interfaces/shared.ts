import { Observable } from 'rxjs';

export type MaybeAsync<T = any> = T | Promise<T> | Observable<T>;
export type BooleanLike = MaybeAsync<boolean>;

export type Fn<P extends any[] = any[], R = any> = ((...args: P) => R) | Function;
export type ObjLiteral<K extends string = string, V = any> = Record<K, V>;

export interface MethodDescriptor<T extends Fn = Fn> {
  value?: T;
}
