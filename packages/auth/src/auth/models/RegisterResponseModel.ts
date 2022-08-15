import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('RegisterResponse')
export class RegisterResponseModel {
  @Field(() => String)
  login!: string;
}
