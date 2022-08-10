import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUserEntity } from './interfaces';
import { UserRepository } from './UserRepository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  public create(query: Partial<IUserEntity>): IUserEntity {
    return this.userRepo.create(query);
  }

  public findOne(query: Partial<IUserEntity>): Observable<IUserEntity | null> {
    return this.userRepo.findOne(query);
  }

  public save(entity: IUserEntity): Observable<IUserEntity> {
    return this.userRepo.save(entity);
  }
}
