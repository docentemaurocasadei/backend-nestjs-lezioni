import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  

  getHello(): string {
    return 'Hello World!';
  }

  getToken() {
    const jwt = new JwtService(
      { secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1h' } })
      .sign({ userId: 1, username: 'mauro' });
    return jwt;
  }
  parseToken(token: string) {
    try {
      const payload = new JwtService({ secret: process.env.JWT_SECRET }).verify(token);
      return payload;
    } catch (e) {
      return null;
    }
  }
}
