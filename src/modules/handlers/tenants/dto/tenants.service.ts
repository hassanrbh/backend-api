import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './create-tenant.dto';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantService {
  @InjectRepository(Tenant)
  private readonly tenantRepository: Repository<Tenant>;

  async create(dto: CreateTenantDto): Promise<Tenant> {
    const tenant = new Tenant();
    tenant.name = dto.name;
    const tenant_repo = await this.tenantRepository.save(tenant);

    return tenant_repo;
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }
}
