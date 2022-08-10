import { HttpException, HttpStatus } from '@nestjs/common';

export class Unauthorized extends HttpException {
  constructor() {
    super(`Unauthorized`, HttpStatus.UNAUTHORIZED);
  }
}
