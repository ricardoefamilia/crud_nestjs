import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { MyDynamicModule } from 'src/my-dynamic/my-dynamic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recado]),
    PessoasModule,
    MyDynamicModule.register({
      apiKey: 'Aqui em a API KEY',
      apiUrl: 'http://blablabla',
    }),
  ],
  controllers: [RecadosController],
  providers: [RecadosService],
})
export class RecadosModule {}
