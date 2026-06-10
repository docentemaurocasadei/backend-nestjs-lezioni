import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppconfigService } from './appconfig/app-config.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appConfigService: AppconfigService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('app-name')
  getAppName(): string {
    return this.appConfigService.getAppName();
  }
}
