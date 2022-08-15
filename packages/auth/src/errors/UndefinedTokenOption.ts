import { HttpException } from '@nestjs/common';

export class UndefinedTokenOptionError extends HttpException {
  constructor(optionName: string) {
    super(`Undefined Token Option(${optionName})`, 500);
  }
}
