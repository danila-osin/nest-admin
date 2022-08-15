import { NestFactory } from '@nestjs/core';

import { AppModule } from './AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot());
  await app.listen(3001);
}
bootstrap();

