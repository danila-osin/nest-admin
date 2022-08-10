import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUserEntity } from './interfaces';
import { UserRepository } from './UserRepository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public create(query: Omit<IUserEntity, 'id'>): Observable<IUserEntity> {
    return this.userRepository.save(query);
  }

  public findByLogin(login: string) {
    return this.userRepository.findOne({ login });
  }

  public find(id: string) {
    return this.userRepository.findOne({ id });
  }
}
