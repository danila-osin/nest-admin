import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserEntity } from './interfaces';
import { UserEntity } from './UserEntity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<IUserEntity>,
  ) {}

  public get() {
    return this.userRepository.find();
  }
}

