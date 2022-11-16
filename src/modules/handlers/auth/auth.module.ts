import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../user/user.service';
import { LocalStrategy } from './local.auth';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.auth';
import { TenantsModule } from '../tenants/dto/tenants.module';

@Module({
  imports: [
    User,
    PassportModule,
    JwtModule.register({
      secret: 'somethingsupersecret',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
    TenantsModule,
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
