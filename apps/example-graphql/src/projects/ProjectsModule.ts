import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './ProjectEntity';
import { ProjectsResolver } from './ProjectsResolver';
import { ProjectsRepository } from './ProjectsRepository';
import { ProjectsService } from './ProjectsService';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectsResolver, ProjectsService, ProjectsRepository],
})
export class ProjectsModule {}

