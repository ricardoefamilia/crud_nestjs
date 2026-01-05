import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const dadosPessoa = {
        nome: createPessoaDto.nome,
        email: createPessoaDto.email,
        passwordHash: createPessoaDto.password, // In a real application, hash the password before saving
      };
      const novaPessoa = this.pessoaRepository.create(dadosPessoa);
      await this.pessoaRepository.save(novaPessoa);
      return novaPessoa;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === '23505') {
        // console.error('Erro ao criar pessoa:', error);
        throw new ConflictException('Email já cadastrado.');
      }
    }
  }

  async findAll() {
    const pessoas = await this.pessoaRepository.find({
      order: { id: 'desc', nome: 'ASC' },
    });
    return pessoas;
  }

  async findOne(id: number): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findOneBy({ id });
    if (!pessoa) {
      throw new NotFoundException(`Pessoa com ID ${id} não encontrada`);
    }
    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const dadosPessoa = {
      nome: updatePessoaDto?.nome,
      passwordHash: updatePessoaDto?.password, // In a real application, hash the password before saving
    };
    const pessoa = await this.pessoaRepository.preload({
      id: id,
      ...dadosPessoa,
    });
    if (!pessoa) {
      return { message: `Pessoa com ID ${id} não encontrada.` };
    }
    await this.pessoaRepository.save(pessoa);
    return pessoa;
  }

  async remove(id: number) {
    const person = await this.pessoaRepository.findOne({ where: { id } });
    if (!person) {
      return { message: `Pessoa com ID ${id} não encontrada.` };
    }
    await this.pessoaRepository.remove(person);
    return { message: `Pessoa com ID ${id} removida com sucesso.` };
  }
}
