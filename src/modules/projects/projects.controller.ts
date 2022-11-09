import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CreateProjectDto } from './create-project.dto';
import { ProjectEntity } from './project-entities.dto';
import { UpdateProjectDto } from './update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly AppService: AppService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async GetAllProjects(@Query() query: ProjectEntity) {
    return { hello: 'world', query: query.limit };
  }

  @Get(':uuid')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async findSpecificProject(
    @Param('uuid') uuid: string,
    @Body() dto: UpdateProjectDto,
  ) {
    this.AppService.projectService.all();
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  async CreateProject(@Body() dto: CreateProjectDto) {
    return { create: true };
  }

  // TODO: Params should work with ids and project name
  @Patch(':uuid')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async updateProject(@Param() params: { uuid: string }) {
    return { update: true };
  }

  @Delete(':uuid')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async deleteProject(@Param('uuid') uuid: string) {
    return { delete: true };
  }
}
