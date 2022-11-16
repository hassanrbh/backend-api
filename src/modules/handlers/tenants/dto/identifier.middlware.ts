import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class Identifier implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['x-tenant-id']) {
      throw new ForbiddenException('needs a tenant identifier');
    }
    req.tenantId = req.headers['x-tenant-id'].toString();
    next();
  }
}
