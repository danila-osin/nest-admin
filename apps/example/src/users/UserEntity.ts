import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type UserID = string;

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: UserID;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;
}

