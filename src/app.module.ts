import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsController } from './modules/projects/projects.controller';

@Module({
  imports: [],
  controllers: [AppController, ProjectsController],
  providers: [AppService],
})
export class AppModule {}
