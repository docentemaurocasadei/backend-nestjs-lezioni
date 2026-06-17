import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('auth.middleware.ts: 1 start ');
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer itstoken123') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log('auth.middleware.ts: 2 controllo effettuato ');
    next();
  }
}
