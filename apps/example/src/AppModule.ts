import { NestAuthModule } from '@nest-admin/auth';
import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseModule } from 'db';
import { ProjectsModule } from 'projects';
import { UserEntity } from 'users';

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
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
        DatabaseModule.forFeature(),
        ProjectsModule,
      ],
    };
  }
}

