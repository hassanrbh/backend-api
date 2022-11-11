import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../tasks/task.entity';
import { TaskController } from '../tasks/tasks.controller';
import { TasksModule } from '../tasks/tasks.module';
import { TaskService } from '../tasks/tasks.service';
import { Project } from './project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Task]), TasksModule],
  providers: [ProjectService, TaskService],
  controllers: [ProjectsController, TaskController],
})
export class ProjectsModule {}
