import {
  Controller,
  Get,
  HttpCode,
  Header,
  Param,
  Inject,
  Post,
  Body,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateTaskDTO } from './create-task.dto';
import { StatusType, Task } from './task.entity';
import { TaskService } from './tasks.service';
import { UpdateTaskDto } from './update-task.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Tasks')
@Controller('projects/:projectId')
export class TaskController {
  @Inject(TaskService)
  private readonly taskService: TaskService;

  @Get('tasks')
  @ApiOperation({ summary: 'Get A List of All Tasks By Project Id' })
  @ApiResponse({
    status: 200,
    description: 'List Of All Tasks',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 400,
    description: 'Internal Server Error',
  })
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  public async getTasksByProjectId(
    @Param('projectId') projectId: string,
    @Request() req,
  ): Promise<Task[]> {
    return await this.taskService.getAll({ projectId, user: req.user });
  }

  @Get('tasks/:taskId')
  @ApiOperation({ summary: 'Get A specific Task' })
  @ApiResponse({
    status: 200,
    description: 'Get a project',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 400,
    description: 'Internal Server Error',
  })
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  public async getTaskByProjectId(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Request() req,
  ): Promise<Task> {
    return await this.taskService.get({ projectId, taskId, user: req.user });
  }

  @Post('tasks')
  @ApiResponse({ status: 200, description: 'Creating A Task' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of the task',
          example: 'task name',
        },
        description: {
          type: 'string',
          description: 'Description of the task',
          example: 'task description',
        },
      },
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a task By Project Id' })
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  public async createTaskByProjectId(
    @Param('projectId') projectId: string,
    @Body() dto: CreateTaskDTO,
    @Request() req,
  ): Promise<Task> {
    return await this.taskService.create({
      entity: dto,
      projectId,
      user: req.user,
    });
  }

  @Delete('tasks/:taskId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'projectId', type: String })
  @ApiResponse({ status: 200, description: 'Deleting A Task' })
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  public async deleteTaskByProjectId(
    @Param('taskId') taskId: string,
    @Request() req,
  ): Promise<DeleteResult> {
    return this.taskService.delete(taskId);
  }

  @Put('tasks/:taskId')
  @ApiBearerAuth()
  @ApiParam({ name: 'projectId', type: String })
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Changing the task' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'changing the name of the task',
          description: 'changing the name of the task',
        },
        description: {
          type: 'string',
          example: 'changing the description of the task',
          description: 'changing the description of the task',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Change a task' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Header('Content-Type', 'application/json')
  public async updateTaskByProjectId(
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto,
    @Request() req,
  ): Promise<UpdateResult> {
    return this.taskService.update(dto, taskId, req.userz);
  }

  @Put('tasks/:taskId/:status')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Mark A Status as done, inprogress or todo  ' })
  @ApiParam({
    name: 'projectId',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'OK' })
  @Header('Content-Type', 'application/json')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  public async markStatusChanged(
    @Param('taskId') taskId: string,
    @Param('status') marker: StatusType,
  ): Promise<UpdateResult> {
    return this.taskService.changeStatusTask(taskId, marker);
  }
}
