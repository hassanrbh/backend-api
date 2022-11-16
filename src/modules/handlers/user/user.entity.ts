import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tenant } from '../tenants/dto/tenant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToOne(() => Tenant, { onDelete: 'RESTRICT' })
  @JoinColumn()
  tenant: Tenant;
}
