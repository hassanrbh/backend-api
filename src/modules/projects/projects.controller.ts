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
import { Task } from '../tasks/task.entity';
import { TaskService } from '../tasks/tasks.service';
import { CreateProjectDto } from './create-project.dto';
import { ProjectEntity } from './project-entities.dto';
import { Project } from './project.entity';
import { ProjectService } from './projects.service';
import { UpdateProjectDto } from './update-project.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  @Inject(ProjectService)
  @Inject(TaskService)
  private readonly projectService: ProjectService;
  private readonly taskService: TaskService;

  @Get()
  @ApiOperation({ summary: 'Get All Projects' })
  @ApiResponse({ status: 200, description: 'Get All Projects' })
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  public async GetAllProjects(
    @Query() query: ProjectEntity,
  ): Promise<Project[]> {
    return await this.projectService.getAllProjects({
      limit: Number(query.limit),
    });
  }

  @Get(':projectId')
  @ApiResponse({ status: 200, description: 'return the specific project' })
  @ApiOperation({ summary: 'Get A Specific Project' })
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  public async findSpecificProject(
    @Param('projectId') uuid: string,
  ): Promise<Project> {
    return await this.projectService.getProject(uuid);
  }

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'example project',
          description: 'the name of the project ',
        },
        description: {
          type: 'string',
          example: 'This is the description of the project',
          description: 'This is the description of the project',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create a Project' })
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 400, description: 'Invalid Request' })
  @ApiResponse({ status: 201, description: 'create a project' })
  @HttpCode(201)
  public async CreateProject(@Body() dto: CreateProjectDto): Promise<Project> {
    return await this.projectService.createProject(dto);
  }

  @Patch(':projectId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update A Project' })
  @ApiResponse({ status: 200, description: 'Creating A Project' })
  @ApiResponse({ status: 400, description: 'Invalid Request Params' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Update Example project',
          description: 'The update name is of the project',
        },
        description: {
          type: 'string',
          example: 'Update description project',
          description: 'The Update description is of the project',
        },
      },
    },
  })
  @ApiParam({
    name: 'projectId',
    type: String,
  })
  @Header('Content-Type', 'application/json')
  async updateProject(
    @Param() params: { uuid: string },
    @Body() dto: UpdateProjectDto,
  ): Promise<UpdateResult> {
    return await this.projectService.updateProject(params.uuid, dto);
  }

  @Delete(':projectId')
  @ApiOperation({ summary: 'Delete A Project' })
  @ApiResponse({ status: 200, description: 'Deleting A project' })
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  public async deleteProject(
    @Param('projectId') uuid: string,
  ): Promise<DeleteResult> {
    return await this.projectService.deleteProject(uuid);
  }
}
