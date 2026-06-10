import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientsModule } from './ingredients/ingredients.module';
import { AllergensModule } from './allergens/allergens.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [IngredientsModule, AllergensModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'hamburgeria',
    autoLoadEntities: true,
    synchronize: false,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
