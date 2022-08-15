import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends HttpException {
  constructor() {
    super(`Unauthorized`, HttpStatus.UNAUTHORIZED);
  }
}
