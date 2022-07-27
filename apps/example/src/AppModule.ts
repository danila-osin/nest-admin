import { DynamicModule, Module } from '@nestjs/common';
import { ProjectsModule } from 'projects';
import { UsersModule } from 'users';

@Module({})
export class AppModule {
  public static forRoot(typeOrmModule: DynamicModule): DynamicModule {
    return {
      module: AppModule,
      imports: [typeOrmModule, UsersModule, ProjectsModule],
    };
  }
}

