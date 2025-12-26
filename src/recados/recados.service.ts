import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Primeiro recado - Recado de teste',
      de: 'Joana',
      para: 'João',
      lido: false,
      data: new Date(),
    },
  ];

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  findAll() {
    return this.recados;
  }

  findOne(id: string) {
    const recado = this.recados.find((recado) => recado.id === +id);

    if (recado) return recado;

    // throw new HttpException('Recado não encontrado', HttpStatus.NOT_FOUND);
    this.throwNotFoundError();
  }

  create(body: any) {
    this.lastId++;
    const id = this.lastId;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const novoRecado = { id, ...body };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.recados.push(novoRecado);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return novoRecado;
  }

  update(id: string, body: any) {
    const recadoExistenteIndex = this.recados.findIndex(
      (recado) => recado.id === +id,
    );

    if (recadoExistenteIndex < 0) {
      this.throwNotFoundError();
    }

    const recadoExistente = this.recados[recadoExistenteIndex];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.recados[recadoExistenteIndex] = {
      ...recadoExistente,
      ...body,
    };

    return this.recados[recadoExistenteIndex];
  }

  remove(id: string) {
    const recadoExistenteIndex = this.recados.findIndex(
      (recado) => recado.id === +id,
    );
    if (recadoExistenteIndex < 0) {
      this.throwNotFoundError();
    }
    const recadoRemovido = this.recados[recadoExistenteIndex];

    // apaga o recado do array
    this.recados.splice(recadoExistenteIndex, 1);

    return recadoRemovido;
  }
}
