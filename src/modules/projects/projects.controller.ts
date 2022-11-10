import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateProjectDto } from './create-project.dto';
import { ProjectEntity } from './project-entities.dto';
import { Project } from './project.entity';
import { ProjectService } from './projects.service';
import { UpdateProjectDto } from './update-project.dto';

@Controller('projects')
export class ProjectsController {
  @Inject(ProjectService)
  private readonly projectService: ProjectService;

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  public async GetAllProjects(
    @Query() query: ProjectEntity,
  ): Promise<Project[]> {
    return await this.projectService.getAllProjects({
      limit: Number(query.limit),
    });
  }

  @Get(':uuid')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  public async findSpecificProject(
    @Param('uuid') uuid: string,
  ): Promise<Project> {
    return await this.projectService.getProject(uuid);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  public async CreateProject(@Body() dto: CreateProjectDto): Promise<Project> {
    return await this.projectService.createProject(dto);
  }

  // TODO: Params should work with ids and project name
  @Patch(':uuid')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async updateProject(
    @Param() params: { uuid: string },
    @Body() dto: UpdateProjectDto,
  ): Promise<UpdateResult> {
    return await this.projectService.updateProject(params.uuid, dto);
  }

  @Delete(':uuid')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  public async deleteProject(
    @Param('uuid') uuid: string,
  ): Promise<DeleteResult> {
    return await this.projectService.deleteProject(uuid);
  }
}
