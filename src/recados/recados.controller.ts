import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  // Encontra todos os recados
  @Get()
  findAll(@Query() pagination: { limit?: number; page?: number }) {
    const { limit = 10, page = 1 } = pagination;
    console.log(`Limit: ${limit}, Page: ${page}`);
    return this.recadosService.findAll();
  }

  // Encontra apenas um recado
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.recadosService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.recadosService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recadosService.remove(id);
  }
}
