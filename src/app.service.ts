import { Injectable } from '@nestjs/common';
import { ProjectService } from './modules/projects/projects.service';

@Injectable()
export class AppService {
  constructor(readonly projectService: ProjectService) {}
}
