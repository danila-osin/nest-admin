import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './ProjectEntity';
import { ProjectsResolver } from './ProjectsResolver';
import { ProjectsRepository } from './ProjectsRepository';
import { ProjectsService } from './ProjectsService';
import { ProjectsPolicy } from './ProjectsPolicy';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectsResolver, ProjectsPolicy, ProjectsService, ProjectsRepository],
})
export class ProjectsModule {}

