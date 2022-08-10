import { Injectable } from '@nestjs/common';
import { containers, TokenOptsContainerKey } from 'container';
import { InvalidCredentials, LoginBusy } from 'errors';
import { Hasher } from 'hasher';
import { map, mergeMap, Observable } from 'rxjs';
import { Serializer } from 'serializer';
import { UserService } from 'user';
import { ILoginDto, ILoginResponse, IRegisterDto, IRegisterResponse } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly serializer: Serializer,
    private readonly userService: UserService,
    private readonly hasher: Hasher
  ) {}

  public login({ login, password }: ILoginDto): Observable<ILoginResponse> {
    return this.userService.findOne({ login }).pipe(
      map((user) => {
        if (!user || !this.hasher.verify(password, user.password)) throw new InvalidCredentials();

        const ttl = containers.tokenOpts.get<string>(TokenOptsContainerKey.TTL);
        const secret = containers.tokenOpts.get<string>(TokenOptsContainerKey.SECRET);

        if (!secret) throw new InvalidCredentials();

        return {
          token: this.serializer.sign({ userId: user.id }, secret, ttl)
        };
      })
    );
  }

  public register({ login, password, username }: IRegisterDto): Observable<IRegisterResponse> {
    return this.userService.findOne({ login }).pipe(
      mergeMap((user) => {
        if (user) throw new LoginBusy();

        const passwordHash = this.hasher.hash(password);

        return this.userService.save(
          this.userService.create({ username, login, password: passwordHash })
        );
      }),
      map(({ login }) => ({ login }))
    );
  }
}
