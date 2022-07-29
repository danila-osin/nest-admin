import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { USER_ENTITY_KEY } from '../container';
import { NestAuthCoreModule } from '../NestAuthCoreModule';
import { IUserEntity } from './interfaces';

@Injectable()
export class UserService {
  private userRepository: Repository<IUserEntity>;

  constructor(em: EntityManager) {
    const UserEntity = NestAuthCoreModule.boot.getEntity(USER_ENTITY_KEY, true);

    this.userRepository = em.getRepository(UserEntity);
  }

  public get() {
    return this.userRepository.find();
  }
}
