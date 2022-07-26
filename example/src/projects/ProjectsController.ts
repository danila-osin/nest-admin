import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './interfaces';
import { ProjectsService } from './ProjectsService';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  public get() {
    return this.projectsService.get();
  }

  @Get(':id')
  public async getOne(@Param('id') id: string) {
    return (await this.projectsService.get({ id }))?.[0];
  }

  @Post()
  public create(@Body() createDto: CreateProjectDto) {
    return this.projectsService.create(createDto);
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateDto);
  }
}

