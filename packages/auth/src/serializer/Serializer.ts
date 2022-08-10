import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class Serializer {
  public sign(payload: any, secret: string, ttl?: string): string {
    return sign(payload, secret, { expiresIn: ttl || '15m' });
  }

  public verify(token: string, secret: string): any {
    return verify(token, secret);
  }
}
