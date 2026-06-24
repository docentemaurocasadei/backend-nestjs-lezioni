import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
    constructor(
        private readonly configService: ConfigService) {
    }
    async getConnection(): Promise<Connection> {
        return createConnection({
            host: this.configService.get('DB_HOST'),
            user: this.configService.get('DB_USER'),
            password: this.configService.get('DB_PASSWORD'),
            database: this.configService.get('DB_NAME'),
            port: this.configService.get<number>('DB_PORT'),
        });
    }
    async query(sql: string, params?: any[]): Promise<any> {
        const connection = await this.getConnection();
        const [rows] = await connection.execute(sql, params);
        await connection.end();
        return rows;
    }
}
