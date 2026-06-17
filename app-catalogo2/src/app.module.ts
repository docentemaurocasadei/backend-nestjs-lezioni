import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabasesService } from './databases/databases.service';
import { DatabasesModule } from './databases/databases.module';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [ProductsModule, UsersModule, DatabasesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LogsModule
  ],
  controllers: [AppController],
  providers: [AppService, DatabasesService],
})
export class AppModule {}
