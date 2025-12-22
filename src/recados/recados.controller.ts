import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
    // Encontra todos os recados
    @Get()
    findAll() {
        return `Esta ação retorna todos os recados`;
    }

    // Encontra apenas um recado
    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log(id);
        return `Esta ação retorna apenas um recado ID ${id}`;
    }

    @Post()
    create() {
        return `Esta ação cria um recado`;
    }
}
