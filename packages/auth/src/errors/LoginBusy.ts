import { HttpException } from '@nestjs/common';

export class LoginBusyError extends HttpException {
  constructor() {
    super(`Login Busy`, 400);
  }
}
