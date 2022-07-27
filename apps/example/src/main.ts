import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from 'db';

import { AppModule } from './AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot(DatabaseModule.forRoot()));
  await app.listen(3000);
}
bootstrap();

