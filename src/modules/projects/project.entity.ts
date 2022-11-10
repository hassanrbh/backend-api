import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 200 })
  public description: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
