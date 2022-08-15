import { HttpException } from '@nestjs/common';

export class ContextRequestIsUndefinedError extends HttpException {
  constructor() {
    super(`Context Request Is Undefined`, 500);
  }
}
