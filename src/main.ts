import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const porta = 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Banco TNM')
    .setVersion('1.0')
    .build()
  //const document = SwaggerModule.createDocument(app, config);

 
  const document = SwaggerModule.createDocument(app, config);
 
  SwaggerModule.setup('api', app, document);

  await app.listen(porta, () => {
    console.log(`Servidor escutando na porta ${porta}`);
  });
}

bootstrap();
