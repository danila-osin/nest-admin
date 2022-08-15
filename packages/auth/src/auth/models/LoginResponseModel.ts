import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('LoginResponse')
export class LoginResponseModel {
  @Field(() => String)
  token!: string;
}
