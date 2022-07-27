import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from './UserEntity';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(UserEntity) private readonly _repo: Repository<UserEntity>) {}

  public find(input?: DeepPartial<UserEntity>) {
    return this._repo.find({ where: input || {} });
  }

  public save(entity: UserEntity) {
    return this._repo.save(entity);
  }

  public create(input: DeepPartial<UserEntity>) {
    return this._repo.create(input);
  }

  public async delete(id: string) {
    await this._repo.delete({ id });

    return { ok: true };
  }

  public async update(
    criteria: DeepPartial<UserEntity> | string,
    update: DeepPartial<UserEntity>,
  ) {
    await this._repo.update(criteria, update);

    return { ok: true };
  }
}

