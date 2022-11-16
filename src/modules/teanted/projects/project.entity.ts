import { Tenant } from 'src/modules/handlers/tenants/dto/tenant.entity';
import { Entity, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Task } from '../tasks/task.entity';

@Entity({ name: 'project' })
export class Project extends BaseEntity {
  @OneToMany(() => Task, (task) => task.id)
  tasks: Task[];

  @ManyToOne((_) => Tenant, (prt) => prt.projects, { onDelete: 'CASCADE' })
  tenant: Tenant;
}
