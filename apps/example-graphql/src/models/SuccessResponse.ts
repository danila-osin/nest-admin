import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('SuccessResponse')
export class SuccessResponse {
  @Field(() => Boolean)
  ok!: boolean;
}
