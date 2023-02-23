import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const porta  = 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(porta, () => {
    console.log(`Servidor escutando na porta ${porta}`);
  });
}
bootstrap();
