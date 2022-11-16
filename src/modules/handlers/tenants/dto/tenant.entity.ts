import { Project } from 'src/modules/teanted/projects/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @OneToMany(() => Project, (project) => project.id)
  projects: Project[];
}
