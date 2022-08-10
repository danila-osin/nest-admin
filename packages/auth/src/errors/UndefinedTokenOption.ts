import { HttpException } from '@nestjs/common';

export class UndefinedTokenOption extends HttpException {
  constructor(optionName: string) {
    super(`Undefined Token Option(${optionName})`, 500);
  }
}
