import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove atributos/propriedades não declaradas nos DTOs
      forbidNonWhitelisted: true, // retorna erro ao receber propriedades não declaradas
      transform: false, // Converte JSON da requisição em instância DTO, ajustando tipos quando possível.
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
