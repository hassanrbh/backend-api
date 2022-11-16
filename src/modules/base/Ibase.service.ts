import { UpdateResult } from 'typeorm';

export interface IBaseService<T> {
  getAll({ projectId }: { projectId: string; user: object }): Promise<T[]>;
  get?({
    projectId,
    taskId,
    user,
  }: {
    projectId: any;
    taskId: string;
    user: any;
  }): Promise<T>;
  update?(entity: T, id: string, user: any): Promise<UpdateResult>;
  create?({ entity }: { entity: T }): Promise<T>;
  delete?(id: string, user: any);
}
