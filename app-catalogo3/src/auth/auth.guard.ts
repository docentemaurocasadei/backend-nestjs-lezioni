import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const email = request.body.email;
    const password = request.body.password;
    if (!email || email !== 'admin@email.it' 
      || !password || password !== 'admin123') {
      return false;
    }
    return true;
  }
}
