import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { TolowerMiddleware } from './tolower/tolower.middleware';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: any) {
    // console.log('app.module.ts: 1 start ');
    consumer.apply(AuthMiddleware).forRoutes('*');
    consumer.apply(TolowerMiddleware).forRoutes(
      { path: 'products', method: RequestMethod.POST },
      { path: 'products/:id', method: RequestMethod.PUT },
    );
    console.log('app.module.ts: 2 auth middleware applied ');
  }
}
