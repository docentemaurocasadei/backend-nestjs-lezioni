import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // rimuove campi extra
      transform: true, // trasforma i tipi
      errorHttpStatusCode: 422, // ← qui
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
