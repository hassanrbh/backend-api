import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { TenantsModule } from '../tenants/dto/tenants.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TenantsModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
