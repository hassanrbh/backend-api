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
  Request,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TaskService } from '../tasks/tasks.service';
import { CreateProjectDto } from './create-project.dto';
import { Project } from './project.entity';
import { ProjectService } from './projects.service';
import { UpdateProjectDto } from './update-project.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
  @Inject(ProjectService)
  @Inject(TaskService)
  private readonly projectService: ProjectService;

  @Get()
  @ApiOperation({ summary: 'Get All Projects Of a Given Tenant' })
  @ApiResponse({ status: 200, description: 'Get All Projects' })
  @Header('Content-Type', 'application/json')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  public async GetAllProjects(@Request() req): Promise<Project[]> {
    const projects = await this.projectService.getAll({
      user: req.user,
    });
    return projects;
  }

  @Get(':projectId')
  @ApiResponse({ status: 200, description: 'return the specific project' })
  @ApiOperation({ summary: 'Get A Specific Project' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  public async findSpecificProject(
    @Param('projectId') uuid: string,
    @Request() req,
  ): Promise<Project> {
    return await this.projectService.get({ projectId: uuid, user: req.user });
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
  @UseGuards(AuthGuard('jwt'))
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 400, description: 'Invalid Request' })
  @ApiResponse({ status: 201, description: 'create a project' })
  @ApiBearerAuth()
  @HttpCode(201)
  public async CreateProject(
    @Body() dto: CreateProjectDto,
    @Request() req,
  ): Promise<Project> {
    return await this.projectService.create({ entity: dto, user: req.user });
  }

  @Patch(':projectId')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update A Project' })
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @Header('Content-Type', 'application/json')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() dto: UpdateProjectDto,
    @Request() req,
  ): Promise<UpdateResult> {
    console.log('updating');
    return await this.projectService.update(dto, projectId, req.user);
  }

  @Delete(':projectId')
  @ApiOperation({ summary: 'Delete A Project' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Deleting A project' })
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  public async deleteProject(
    @Param('projectId') uuid: string,
  ): Promise<DeleteResult> {
    return await this.projectService.delete(uuid);
  }
}
