import { Injectable } from '@nestjs/common';
import { UserEntity } from './UserEntity';
import { UsersRepository } from './UsersRepository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async get(input?: Partial<UserEntity>) {
    return await this.usersRepository.find(input);
  }

  public async create(input: Partial<UserEntity>) {
    const user = this.usersRepository.create(input);

    return this.usersRepository.save(user);
  }

  public async delete(idOrEntity: string | UserEntity) {
    return await this.usersRepository.delete(
      typeof idOrEntity === 'string' ? idOrEntity : idOrEntity.id,
    );
  }
}

