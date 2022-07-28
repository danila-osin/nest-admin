import { NestAuthModule } from '@nest-admin/auth';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'db';
import { ProjectsModule } from 'projects';
import { UserEntity } from 'users/UserEntity';

@Module({
  imports: [
    NestAuthModule.forRoot({
      database: {
        type: 'typeorm',
        entities: {
          User: UserEntity,
        },
      },
    }),
    DatabaseModule.forRoot(),
    ProjectsModule,
  ],
})
export class AppModule {}

