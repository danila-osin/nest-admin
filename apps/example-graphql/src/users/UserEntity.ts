import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type UserID = string;

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: UserID;

  @Column()
  public username!: string;

  @Column()
  public login!: string;

  @Column()
  public password!: string;
}

