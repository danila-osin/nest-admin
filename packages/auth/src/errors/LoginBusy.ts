import { HttpException } from '@nestjs/common';

export class LoginBusy extends HttpException {
  constructor() {
    super(`Login Busy`, 400);
  }
}
