import { Module } from '@nestjs/common';
import { DatabaseModule } from 'db';
import { ProjectsModule } from 'projects';
import { UsersModule } from 'users';

@Module({
  imports: [DatabaseModule.forRoot(), UsersModule, ProjectsModule],
})
export class AppModule {}

