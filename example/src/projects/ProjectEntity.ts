import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from 'users';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public name!: string;

  @Column()
  public title!: string;

  @Column()
  public ownerId!: string;

  @ManyToOne(() => UserEntity)
  public owner!: UserEntity;
}

