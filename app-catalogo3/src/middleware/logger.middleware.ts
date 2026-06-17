import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const date = new Date();
    console.log(`logger.middleware.ts: ${date.toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
  }
}
