import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log('main.ts: 1 start');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  const options = new DocumentBuilder()
    .setTitle('Product Catalog API')
    .setDescription('API for managing products in the catalog')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  console.log('main.ts: 2 swagger ');

  await app.listen(process.env.PORT ?? 3000);
  console.log('main.ts: 3 app in esecuzione ');

}
bootstrap();
