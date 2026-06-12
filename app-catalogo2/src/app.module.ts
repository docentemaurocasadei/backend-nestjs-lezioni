import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabasesService } from './databases/databases.service';
import { DatabasesModule } from './databases/databases.module';

@Module({
  imports: [ProductsModule, UsersModule, DatabasesModule],
  controllers: [AppController],
  providers: [AppService, DatabasesService],
})
export class AppModule {}
