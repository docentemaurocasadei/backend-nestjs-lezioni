import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ToLowerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const body = req.body;
    if (body && typeof body === 'object') {
      for (const key in body) {
        if (typeof body[key] === 'string') {
          body[key] = body[key].toLowerCase();
        }
      }
    }
    
    next();
  }
}
