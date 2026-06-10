import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppconfigService } from './appconfig/app-config.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService, AppconfigService],
})
export class AppModule {}
