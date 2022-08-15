import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';
import { LoginModel, LoginResponseModel, RegisterModel, RegisterResponseModel } from './models';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseModel)
  login(@Args('input') input: LoginModel): Observable<LoginResponseModel> {
    return this.authService.login(input);
  }

  @Mutation(() => RegisterResponseModel)
  register(@Args('input') input: RegisterModel): Observable<RegisterResponseModel> {
    return this.authService.register(input);
  }
}
