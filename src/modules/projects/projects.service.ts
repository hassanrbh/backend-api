import { Injectable } from '@nestjs/common';
import { Project } from './interfaces/project.interface';

@Injectable()
export class ProjectService {
  private readonly projects: Project[] = [];

  create(project: Project) {
    this.projects.push(project);
  }

  all(): Project[] {
    return this.projects;
  }
}
