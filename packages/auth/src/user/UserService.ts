import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { containers, USER_ENTITY_KEY } from '../container';
import { IUserEntity } from './interfaces';

@Injectable()
export class UserService {
  private userRepository: Repository<IUserEntity>;

  constructor(em: EntityManager) {
    const UserEntity = containers.entity.get(USER_ENTITY_KEY, true);

    this.userRepository = em.getRepository(UserEntity);
  }

  public get() {
    return this.userRepository.find();
  }
}
