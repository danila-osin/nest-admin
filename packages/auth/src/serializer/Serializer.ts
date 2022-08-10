import { Injectable } from '@nestjs/common';
import { sign, verify, JwtPayload } from 'jsonwebtoken';

@Injectable()
export class Serializer {
  public sign(payload: any, secret: string, ttl?: string): string {
    return sign(payload, secret, { expiresIn: ttl || '15m' });
  }

  public verify<T extends JwtPayload>(token: string, secret: string): T {
    return <T>verify(token, secret);
  }
}
