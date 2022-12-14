import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { UserEntity } from 'users';

@Module({})
export class DatabaseModule {
  public static forRoot() {
    return TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 15555,
      username: 'postgres',
      password: 'postgres',
      database: 'example',
      entities: [path.resolve(__dirname, '../*/*Entity.{js,ts}')],
      synchronize: true,
    });
  }

  public static forFeature() {
    return TypeOrmModule.forFeature([UserEntity]);
  }
}

