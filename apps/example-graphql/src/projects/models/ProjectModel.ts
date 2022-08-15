import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Project')
export class ProjectModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  title!: string;

  @Field(() => ID)
  ownerId!: string;
}

