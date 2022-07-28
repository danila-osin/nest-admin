import { NestAuthModule } from '@nest-admin/auth';
import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseModule } from 'db';
import { ProjectsModule } from 'projects';

@Module({})
export class AppModule {
  public static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        NestAuthModule.forRoot({
          database: {
            type: 'typeorm',
          },
        }),
        DatabaseModule.forRoot(),
        DatabaseModule.forFeature(),
        ProjectsModule,
      ],
    };
  }
}

