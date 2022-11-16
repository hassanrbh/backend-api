import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Project } from '../projects/project.entity';

export type StatusType = 'todo' | 'inprogress' | 'done';

@Entity({ name: 'task' })
export class Task extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ['todo', 'inprogress', 'done'],
    default: 'todo',
  })
  public status: StatusType;

  @ManyToOne((_) => Project, (prt) => prt.tasks, { onDelete: 'CASCADE' })
  project: Project;
}
