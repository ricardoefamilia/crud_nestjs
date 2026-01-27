import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import * as myDynamicModule from 'src/my-dynamic/my-dynamic.module';

@Controller('recados')
// @UsePipes(ParseIntPipe) // usando class Pipe desenvolvida para validação de parâmetro inteiro.
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    @Inject(myDynamicModule.MY_DINAMIC_CONFIG)
    private readonly myDynamicConfigs: myDynamicModule.MyDynamicModuleConfigs,
  ) {
    console.log('RecadosController', this.myDynamicConfigs);
  }

  // Encontra todos os recados
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const result = await this.recadosService.findAll(paginationDto);
    return result;
  }

  // Encontra apenas um recado
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    //console.log(id);
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.remove(id);
  }
}
