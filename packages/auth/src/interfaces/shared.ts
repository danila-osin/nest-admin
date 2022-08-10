import { Observable } from 'rxjs';

export interface MethodDescriptor<T extends Fn = Fn> {
  value?: T;
}

export type MaybeAsync<T = any> = T | Promise<T> | Observable<T>;
export type BooleanLike = MaybeAsync<boolean>;

export type Fn<P extends any[] = any[], R = any> = ((...args: P) => R) | Function;
export type ObjLiteral<K extends string = string, V = any> = Record<K, V>;

export type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
      ? Map<DeepPartial<K>, DeepPartial<V>>
      : T extends Set<infer M>
      ? Set<DeepPartial<M>>
      : T extends object
      ? {
          [K in keyof T]?: DeepPartial<T[K]>;
        }
      : T);
