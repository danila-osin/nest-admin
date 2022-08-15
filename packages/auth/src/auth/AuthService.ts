import { Injectable } from '@nestjs/common';
import { InvalidCredentialsError, LoginBusyError } from 'errors';
import { Hasher } from 'hasher';
import { map, mergeMap, Observable } from 'rxjs';
import { TokenService } from 'token';
import { UserService } from 'user';
import { ILoginDto, ILoginResponse, IRegisterDto, IRegisterResponse } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly hasher: Hasher
  ) {}

  public login({ login, password }: ILoginDto): Observable<ILoginResponse> {
    return this.userService.findByLogin(login).pipe(
      map((user) => {
        if (!user || !this.hasher.verify(password, user.password))
          throw new InvalidCredentialsError();

        return { token: this.tokenService.sign({ userId: user.id }) };
      })
    );
  }

  public register({ login, password, username }: IRegisterDto): Observable<IRegisterResponse> {
    return this.userService.findByLogin(login).pipe(
      mergeMap((user) => {
        if (user) throw new LoginBusyError();

        const passwordHash = this.hasher.hash(password);

        const userEntity = { login, password: passwordHash, username };

        return this.userService.create(userEntity);
      }),
      map(({ login }) => ({ login }))
    );
  }
}
