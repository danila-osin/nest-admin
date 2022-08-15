import { Field, InputType } from '@nestjs/graphql';

@InputType('RegisterInput')
export class RegisterModel {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  login!: string;

  @Field(() => String)
  password!: string;
}
