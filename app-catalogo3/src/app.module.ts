import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: any) {
    console.log('app.module.ts: 1 start ');
    consumer.apply(AuthMiddleware).forRoutes('*');
    console.log('app.module.ts: 2 auth middleware applied ');
  }
}
