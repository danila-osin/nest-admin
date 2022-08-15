import { Field, InputType } from '@nestjs/graphql';

@InputType('LoginInput')
export class LoginModel {
  @Field(() => String)
  login!: string;

  @Field(() => String)
  password!: string;
}
