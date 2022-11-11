import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../projects/project.entity';
import { Task } from './task.entity';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Project])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TasksModule {}
