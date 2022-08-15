import { HttpException } from '@nestjs/common';

export class InvalidCredentialsError extends HttpException {
  constructor() {
    super(`Invalid Credentials`, 400);
  }
}
