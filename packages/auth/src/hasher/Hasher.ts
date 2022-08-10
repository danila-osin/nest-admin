import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class Hasher {
  private splitter = ':';

  public hash(payload: string, salt = this.getSalt()): string {
    const hashBuffer = crypto.scryptSync(payload, salt, 64);

    return `${salt}${this.splitter}${hashBuffer.toString('hex')}`;
  }

  public verify(payload: string, hash: string) {
    const [salt] = hash.split(this.splitter);

    return hash === this.hash(payload, salt);
  }

  private getSalt() {
    return crypto.randomBytes(16).toString('hex');
  }
}
