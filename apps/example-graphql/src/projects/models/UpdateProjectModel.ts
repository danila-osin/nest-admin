import { InputType, Field, ID } from '@nestjs/graphql';

@InputType('UpdateProjectInput')
export class UpdateProjectModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  title?: string;
}

