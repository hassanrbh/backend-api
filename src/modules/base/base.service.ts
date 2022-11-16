import { BadGatewayException, Injectable, UseGuards } from '@nestjs/common';
import { IBaseService } from './Ibase.service';
import { BaseEntity } from './base.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(private readonly genericRepository: Repository<any>) {}

  create({
    entity,
    projectId,
    user,
  }: {
    entity: any;
    projectId?: any;
    user?: any;
  }): Promise<T> {
    try {
      if (projectId) {
        const task = <Promise<any>>this.genericRepository.create({
          name: entity.name,
          description: entity.description,
          project: {
            id: projectId,
            tenant: {
              id: user.user.username.tenant.id,
            },
          },
        });
        return <Promise<any>>this.genericRepository.save(task);
      }
      const project = <Promise<any>>this.genericRepository.create({
        name: entity.name,
        description: entity.description,
        tenant: {
          id: user.user.username.tenant.id,
        },
      });
      return <Promise<any>>this.genericRepository.save(project);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAll({
    projectId,
    user,
  }: {
    projectId?: string;
    user?: any;
  }): Promise<T[]> {
    try {
      if (!projectId) return await (<Promise<any[]>>this.genericRepository.find(
          {
            where: {
              tenant: {
                id: user.user.username.tenant.id,
              },
            },
          },
        ));
      return <Promise<any[]>>this.genericRepository.findBy({
        project: {
          id: projectId,
          tenant: {
            id: user.user.username.tenant.id,
          },
        },
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  get({
    projectId,
    taskId,
    user,
  }: {
    projectId: any;
    taskId?: string;
    user: any;
  }): Promise<T> {
    try {
      if (projectId && taskId) {
        return <Promise<any>>this.genericRepository.findOne({
          where: {
            project: {
              id: projectId,
              tenant: {
                id: user.user.username.tenant.id,
              },
            },
            id: taskId,
          },
        });
      }
      return <Promise<any>>this.genericRepository.findOneBy({
        id: projectId,
        tenant: { id: user.user.username.tenant.id },
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  delete(id: string): Promise<DeleteResult> {
    try {
      return <Promise<DeleteResult>>this.genericRepository.delete(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  update(entity: any, id: string, user: any): Promise<UpdateResult> {
    try {
      return <Promise<UpdateResult>>this.genericRepository.update(id, entity);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
