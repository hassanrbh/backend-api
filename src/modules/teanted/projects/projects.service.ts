import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/project.entity';
import { BaseService } from 'src/modules/base/base.service';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
    super(projectRepository);
  }
}
