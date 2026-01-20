import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from './pessoas/pessoas.module';
import { SimpleMiddleware } from './common/middlewares/simple.middlewares';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
// import { MyExceptionFilter } from './common/filters/my-exception.filter';
import { ErrorExceptionFilter } from './common/filters/error-exception.filter';
import { IsAdminGuard } from './common/guards/is-admin.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'postgres',
      autoLoadEntities: true, // Carrega automaticamente as entidades
      synchronize: true, // Sincroniza o esquema do banco de dados com as entidades (somente em desenvolvimento)
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // iniciando os módulos (injeção de dependência) globalmente
    {
      provide: APP_FILTER,
      useClass: ErrorExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: IsAdminGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: 'recados/*',
      method: RequestMethod.ALL,
    });
  }
}
