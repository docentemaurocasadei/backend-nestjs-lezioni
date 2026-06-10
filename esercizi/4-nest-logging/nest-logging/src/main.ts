import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(({ timestamp, level, message }) => {  
            return `${timestamp} [${level}]: ${message}`;
          })
        )
      }),
      new winston.transports.File({ 
        filename: 'logs/app.log',
        level: 'info',  
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        )
      }),
      
    ]
  });

  logger.log('Starting application');
  

  const app = await NestFactory.create(AppModule, { logger });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
