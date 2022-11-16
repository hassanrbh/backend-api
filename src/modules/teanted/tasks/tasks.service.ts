import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/modules/base/base.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Project } from '../projects/project.entity';
import { CreateTaskDTO } from './create-task.dto';
import { StatusType, Task } from './task.entity';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TaskService extends BaseService<Task> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }

  public async changeStatusTask(
    taskId: string,
    dto: StatusType,
  ): Promise<UpdateResult> {
    return await this.taskRepository.update(taskId, { status: dto });
  }
}
