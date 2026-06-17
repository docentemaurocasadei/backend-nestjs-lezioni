import { Module, Global } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { LogsModule } from 'src/logs/logs.module';

@Global()
@Module({
    imports: [LogsModule],
    providers: [DatabasesService],
    exports: [DatabasesService]
})
export class DatabasesModule {}
