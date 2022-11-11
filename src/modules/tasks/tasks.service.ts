import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Project } from '../projects/project.entity';
import { CreateTaskDTO } from './create-task.dto';
import { StatusType, Task } from './task.entity';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TaskService {
  @InjectRepository(Task)
  @InjectRepository(Project)
  private readonly taskRepository: Repository<Task>;
  private readonly projectRepository: Repository<Project>;

  public async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  public async getTasksByProjectId(projectId: string): Promise<Task[]> {
    const tasks = await this.taskRepository.find({
      where: {
        project: {
          id: projectId,
        },
      },
    });
    return tasks;
  }

  public async changeStatusTask(
    taskId: string,
    dto: StatusType,
  ): Promise<UpdateResult> {
    return await this.taskRepository.update(taskId, { status: dto });
  }

  public async updateTaskByProjectId(
    taskId: string,
    dto: UpdateTaskDto,
  ): Promise<UpdateResult> {
    return await this.taskRepository.update(taskId, dto);
  }

  public async getTaskByProjectId(
    projectId: string,
    taskId: string,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        project: {
          id: projectId,
        },
        id: taskId,
      },
    });
    return task;
  }

  public async deleteTaskByProjectId(delete_id: string): Promise<DeleteResult> {
    return await this.taskRepository.delete(delete_id);
  }

  public async createTaskByProjectId(
    projectId: string,
    dto: CreateTaskDTO,
  ): Promise<Task> {
    const task = await this.taskRepository.create({
      name: dto.name,
      description: dto.description,
      project: {
        id: projectId,
      },
    });
    return this.taskRepository.save(task);
  }
}
