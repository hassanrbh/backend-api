import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './user.service';
import { User } from './user.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Users')
export class UsersController {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  @Post('/signup')
  @ApiOperation({
    summary: 'Sign up A new Account (automatically  you are a tenant)',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'testing',
          description: 'the username of the user',
        },
        password: {
          type: 'string',
          example: 'testing',
          description: 'the password of the user',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Sign Up The User' })
  @ApiResponse({ status: 400, description: 'Something Bad Happens' })
  @ApiBearerAuth()
  @HttpCode(200)
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(username, hashedPassword);
    return result;
  }
}
