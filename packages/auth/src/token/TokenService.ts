import { Injectable } from '@nestjs/common';
import { containers, TokenOptsContainerKey } from 'container';
import { Serializer } from 'serializer';
import { JwtPayload } from 'jsonwebtoken';
import { IncomingMessage } from 'http';
import { Unauthorized } from 'errors';

@Injectable()
export class TokenService {
  constructor(private readonly serializer: Serializer) {}

  public sign(payload: any): string {
    const ttl = containers.tokenOpts.get<string>(TokenOptsContainerKey.TTL);
    const secret = containers.tokenOpts.get<string>(TokenOptsContainerKey.SECRET, true);

    return this.serializer.sign(payload, secret, ttl);
  }

  public verify<T extends JwtPayload>(token: string): T {
    const secret = containers.tokenOpts.get<string>(TokenOptsContainerKey.SECRET, true);

    return this.serializer.verify(token, secret);
  }

  public getTokenFromRequest(request: IncomingMessage): string | undefined {
    return request.headers['authorization']?.split('Bearer ')?.at(1);
  }

  public validateToken(token: string | undefined): asserts token is string {
    if (!token || typeof token !== 'string') throw new Unauthorized();
  }
}
