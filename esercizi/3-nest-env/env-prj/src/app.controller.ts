import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('info')
  getInfo() {
    return {
      appName: process.env.APP_NAME,
      port: process.env.PORT
    };
  }

  @Get('get-token')
  getToken() {
    return this.appService.getToken();
  }

  @Get('parse-token')
  parseToken() {
    const token = this.appService.getToken();
    return this.appService.parseToken(token);
  }
}
