import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { SuppliersModule } from './suppliers/suppliers.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ToUpperMiddleware } from './utilities/toupper.middleware';
import { ToLowerMiddleware } from './utilities/tolower.middleware';

@Module({
  imports: [ProductsModule, SuppliersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: any) {
    // console.log('app.module.ts: 1 start ');
    // consumer.apply(AuthMiddleware).forRoutes(
    //   { path: 'products', method: RequestMethod.ALL },
    //   { path: 'suppliers', method: RequestMethod.POST },
    //   { path: 'suppliers/:id', method: RequestMethod.PUT },
    //   { path: 'suppliers/:id', method: RequestMethod.DELETE },
    // );
    consumer.apply(ToLowerMiddleware).forRoutes(
      { path: 'products', method: RequestMethod.POST },
      { path: 'products/:id', method: RequestMethod.PUT },
    );
    consumer.apply(ToUpperMiddleware).forRoutes(
      { path: 'suppliers', method: RequestMethod.POST },
      { path: 'suppliers/:id', method: RequestMethod.PUT },
    );
    consumer.apply(LoggerMiddleware).forRoutes(
      { path: 'suppliers', method: RequestMethod.POST },
    );
    console.log('app.module.ts: 2 auth middleware applied ');
  }
}
