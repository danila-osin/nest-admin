import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './ProjectEntity';
import { ProjectsController } from './ProjectsController';
import { ProjectsRepository } from './ProjectsRepository';
import { ProjectsService } from './ProjectsService';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository],
})
export class ProjectsModule {}

