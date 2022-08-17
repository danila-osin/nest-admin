import { Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { SerializerVerifyError } from './errors';

@Injectable()
export class Serializer {
  public sign(payload: any, secret: string, ttl?: string | number): string {
    return sign(payload, secret, { expiresIn: ttl || '15m' });
  }

  public verify<T extends JwtPayload>(token: string, secret: string): T {
    try {
      return <T>verify(token, secret);
    } catch (e) {
      throw new SerializerVerifyError((e as Error).message || '');
    }
  }
}
