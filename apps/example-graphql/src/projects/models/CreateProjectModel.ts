import { InputType, Field, ID } from '@nestjs/graphql';

@InputType('CreateProjectInput')
export class CreateProjectModel {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  title!: string;

  @Field(() => ID)
  ownerId!: string;
}

