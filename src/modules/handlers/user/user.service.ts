import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantService } from '../tenants/dto/tenants.service';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(TenantService)
  private readonly tenantService: TenantService;

  async createUser(username: string, password: string): Promise<User> {
    if (username && password) {
      const tenant = await this.tenantService.create({ name: username });
      const user = await this.userRepository.create({
        username,
        password,
        tenant: tenant,
      });
      return await this.userRepository.save(user);
    }
  }

  async getUser({ username }: { username: string }): Promise<User> {
    return this.userRepository.findOne({
      where: { username: username },
      relations: { tenant: true },
    });
  }
}
