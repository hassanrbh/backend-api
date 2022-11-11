import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '../projects/project.entity';

export type StatusType = 'todo' | 'inprogress' | 'done';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column({
    type: 'enum',
    enum: ['todo', 'inprogress', 'done'],
    default: 'todo',
  })
  public status: StatusType;

  @ManyToOne((_) => Project, (prt) => prt.tasks)
  project: Project;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
