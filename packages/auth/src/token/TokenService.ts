import { Inject, Injectable } from '@nestjs/common';
import { NEST_AUTH_TOKEN_OPTIONS } from 'const';
import { Unauthorized } from 'errors';
import { IncomingMessage } from 'http';
import { INestAuthTokenOptions } from 'interfaces';
import { JwtPayload } from 'jsonwebtoken';
import { Serializer } from 'serializer';

@Injectable()
export class TokenService {
  constructor(
    private readonly serializer: Serializer,
    @Inject(NEST_AUTH_TOKEN_OPTIONS) private readonly tokenOptions: INestAuthTokenOptions
  ) {}

  public sign(payload: any): string {
    const { secret, ttl } = this.tokenOptions;

    return this.serializer.sign(payload, secret, ttl);
  }

  public verify<T extends JwtPayload>(token: string): T {
    const { secret } = this.tokenOptions;

    return this.serializer.verify(token, secret);
  }

  public getTokenFromRequest(request: IncomingMessage): string | undefined {
    return request.headers['authorization']?.split('Bearer ')?.at(1);
  }

  public getValidTokenFromRequest(request: IncomingMessage): string {
    const token = this.getTokenFromRequest(request);
    this.validateToken(token);

    return token;
  }

  public validateToken(token: string | undefined): asserts token is string {
    if (!token || typeof token !== 'string') throw new Unauthorized();
  }
}
