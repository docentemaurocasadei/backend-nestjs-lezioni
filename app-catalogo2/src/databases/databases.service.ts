import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class DatabasesService {
    constructor(
        private readonly configService: ConfigService,
        private readonly logsService: LogsService
    ) {
        this.logsService.writeLog('DatabasesService initialized');
    }
    getInfo() {
        this.logsService.writeLog('Database info requested');
        return {
            name: 'MyDatabase',
            version: '1.0.0',
            status: 'connected',
            appName: this.configService.get('APP_NAME')
        };
    }
}
