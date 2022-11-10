import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Project } from '../projects/project.entity';
import { CreateProjectDto } from '../projects/create-project.dto';
import { REGEX_FIND_REAL_NAME } from './helpers/FindRealNameProject';
import { UpdateProjectDto } from './update-project.dto';

@Injectable()
export class ProjectService {
  @InjectRepository(Project)
  private readonly repository: Repository<Project>;

  public async getAllProjects({
    limit,
  }: {
    limit?: number;
  }): Promise<Project[]> {
    if (limit)
      return await this.repository.find({
        take: limit,
        order: { createdAt: 'ASC' },
      });

    return await this.repository.find();
  }

  public async createProject(dto: CreateProjectDto): Promise<Project> {
    const project = this.repository.create({
      name: dto.name,
      description: dto.description,
    });
    return await this.repository.save(project);
  }

  public async getProject(find: string): Promise<Project> {
    const matchName = new RegExp(REGEX_FIND_REAL_NAME);
    if (matchName.test(find)) {
      return await this.repository.findOne({ where: { name: find } });
    }
    return await this.repository.findOne({ where: { id: find } });
  }

  public async deleteProject(find: string): Promise<DeleteResult> {
    const matchName = new RegExp(REGEX_FIND_REAL_NAME);
    if (matchName.test(find)) {
      return await this.repository.delete(find);
    }
    return await this.repository.delete(find);
  }

  public async updateProject(
    uuid: string,
    updateProject: UpdateProjectDto,
  ): Promise<UpdateResult> {
    return this.repository.update(uuid, updateProject);
  }
}
