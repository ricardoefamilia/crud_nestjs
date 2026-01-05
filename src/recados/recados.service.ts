import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadosRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
  ) {}

  /**
   * Sempre lança exceção.
   * O retorno `never` informa ao TypeScript
   * que a execução NÃO continua após esta chamada.
   */
  private throwNotFoundError(): never {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto ?? {};

    const recados = await this.recadosRepository.find({
      take: limit,
      skip: offset,
      relations: ['de', 'para'],
      order: { id: 'desc' },
    });
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadosRepository.findOne({ where: { id } });
    if (recado) return recado;
    // throw new HttpException('Recado não encontrado', HttpStatus.NOT_FOUND);
    this.throwNotFoundError();
  }

  async create(createRecadoDto: CreateRecadoDto) {
    // Encontrar a pesssoa emissora e destinatária antes de criar o recado
    const { deId, paraId } = createRecadoDto;
    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);

    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };
    const recado = this.recadosRepository.create(novoRecado);
    await this.recadosRepository.save(recado);
    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
    };
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado = await this.findOne(id);
    recado.texto = updateRecadoDto.texto ?? recado.texto;
    recado.lido = updateRecadoDto.lido ?? recado.lido;
    await this.recadosRepository.save(recado);
    return recado;
  }

  async remove(id: number) {
    const recado = await this.recadosRepository.findOneBy({ id });
    if (!recado) {
      this.throwNotFoundError();
    }
    await this.recadosRepository.remove(recado);
    return recado;
  }
}
