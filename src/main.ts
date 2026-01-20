import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { MyExceptionFilter } from './common/filters/my-exception.filter';
//import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove atributos/propriedades não declaradas nos DTOs
      forbidNonWhitelisted: true, // retorna erro ao receber propriedades não declaradas
      transform: false, // Converte JSON da requisição em instância DTO, ajustando tipos quando possível.
    }),
    // qdo quiser usar uma classe PIPE criada para validar parâmetro inteiro iniciada direto no construtor
    // new ParseIntIdPipe(),
  );

  // app.useGlobalFilters(new MyExceptionFilter()); // exemplo de Filters file filters/my-exception.filter.ts

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
