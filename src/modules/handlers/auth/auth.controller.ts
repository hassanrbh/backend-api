import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
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
  @Post('login')
  @ApiOperation({ summary: 'Login To Get Your Access Token For Authorization' })
  @ApiResponse({ status: 200, description: 'Login' })
  @ApiResponse({ status: 403, description: 'unauthorized' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Return The Current User' })
  @ApiResponse({ status: 200, description: 'returns the current user' })
  @ApiResponse({ status: 403, description: 'unauthorized' })
  @ApiBearerAuth()
  @Get('me')
  async me(@Request() req) {
    console.log(req.user);
  }
}
