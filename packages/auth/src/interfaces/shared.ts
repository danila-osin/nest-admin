import { Observable } from 'rxjs';

export type BooleanLike = boolean | Promise<boolean> | Observable<boolean>;

export type ClassType<Instance, Args extends any[] = any[]> = new (...args: Args) => Instance;

