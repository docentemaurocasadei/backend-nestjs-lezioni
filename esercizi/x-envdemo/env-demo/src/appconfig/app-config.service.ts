import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppconfigService {
    constructor(private configService: ConfigService) {}
    getConfigValue(key: string): string {
    let value: string = this.configService.get<string>(key)!;

    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    return value;
  }
    getAppName(): string {
        return this.getConfigValue('APP_NAME');
    }
}
