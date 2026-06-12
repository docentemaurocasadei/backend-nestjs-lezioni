import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabasesService {
    getInfo() {
        return {
            name: 'MyDatabase',
            version: '1.0.0',
            status: 'connected'
        };
    }
}
