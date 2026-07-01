import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ProductsModule, DatabaseModule, ConfigModule.forRoot({
    isGlobal: true,
  }),
    ServeStaticModule.forRoot({
    rootPath: join(process.cwd(), 'public'),
    exclude: ['/api', '/api/{*path}'],
    })],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
