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
} from '@nestjs/swagger';

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
  @ApiResponse({
    status: 400,
    description: 'Internal Server Error',
  })
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  public async getTasksByProjectId(
    @Param('projectId') projectId: string,
  ): Promise<Task[]> {
    return await this.taskService.getTasksByProjectId(projectId);
  }

  @Get('tasks/:taskId')
  @ApiOperation({ summary: 'Get A specific Task' })
  @ApiResponse({
    status: 200,
    description: 'Get a project',
  })
  @ApiResponse({
    status: 400,
    description: 'Internal Server Error',
  })
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  public async getTaskByProjectId(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ): Promise<Task> {
    return await this.taskService.getTaskByProjectId(projectId, taskId);
  }

  @Post('tasks')
  @ApiResponse({ status: 200, description: 'Creating A Task' })
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
  @ApiOperation({ summary: 'Create a task By Project Id' })
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  public async createTaskByProjectId(
    @Param('projectId') projectId: string,
    @Body() dto: CreateTaskDTO,
  ): Promise<Task> {
    return await this.taskService.createTaskByProjectId(projectId, dto);
  }

  @Delete('tasks/:taskId')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'projectId', type: String })
  @ApiResponse({ status: 200, description: 'Deleting A Task' })
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  public async deleteTaskByProjectId(
    @Param('taskId') taskId: string,
  ): Promise<DeleteResult> {
    return this.taskService.deleteTaskByProjectId(taskId);
  }

  @Put('tasks/:taskId')
  @ApiParam({ name: 'projectId', type: String })
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
  @Header('Content-Type', 'application/json')
  public async updateTaskByProjectId(
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<UpdateResult> {
    return this.taskService.updateTaskByProjectId(taskId, dto);
  }

  @Put('tasks/:taskId/:status')
  @ApiOperation({ summary: 'Mark A Status as done, inprogress or todo  ' })
  @ApiParam({
    name: 'projectId',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'OK' })
  @Header('Content-Type', 'application/json')
  public async markStatusChanged(
    @Param('taskId') taskId: string,
    @Param('status') marker: StatusType,
  ): Promise<UpdateResult> {
    return this.taskService.changeStatusTask(taskId, marker);
  }
}
