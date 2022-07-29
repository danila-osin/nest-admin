import { Observable } from 'rxjs';

export type BooleanLike = boolean | Promise<boolean> | Observable<boolean>;

