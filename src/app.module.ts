import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { ProjectsModule } from './modules/teanted/projects/projects.module';
import { TasksModule } from './modules/teanted/tasks/tasks.module';
import { UsersModule } from './modules/handlers/user/user.module';
import { AuthModule } from './modules/handlers/auth/auth.module';
import { TenantsModule } from './modules/handlers/tenants/dto/tenants.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TenantsModule,
    ProjectsModule,
    TasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
