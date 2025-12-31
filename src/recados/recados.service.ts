import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadosRepository: Repository<Recado>,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll() {
    const recados = await this.recadosRepository.find();
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadosRepository.findOne({ where: { id } });

    if (recado) return recado;

    // throw new HttpException('Recado não encontrado', HttpStatus.NOT_FOUND);
    this.throwNotFoundError();
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };

    const recado = this.recadosRepository.create(novoRecado);
    await this.recadosRepository.save(recado);
    return recado;
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpRecado = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    };
    const recado = await this.recadosRepository.preload({
      id,
      ...partialUpRecado,
    });

    if (!recado) {
      this.throwNotFoundError();
      return;
    }

    await this.recadosRepository.save(recado);
    return recado;
  }

  async remove(id: number) {
    const recado = await this.recadosRepository.findOneBy({ id });
    if (!recado) {
      this.throwNotFoundError();
      return;
    }
    await this.recadosRepository.remove(recado);
    return recado;
  }
}
