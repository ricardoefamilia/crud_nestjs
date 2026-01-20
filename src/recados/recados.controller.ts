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
  UseInterceptors,
  // UsePipes,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
// import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
// import { TimingConnectionInterceptor } from 'src/common/interceptors/timing-connection.interceptor';
import { ErrorHandlingInterceptor } from 'src/common/interceptors/error-handling.interceptor';
// import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
// import { UrlParam } from 'src/common/params/url-param.decorator';
import { ReqDataParam } from 'src/common/params/req-data-param.decorator';
import * as regexProtocol from 'src/common/regex/regex.protocol';
import {
  ONLY_LOWERCASE_LETTERA_REGEX,
  REMOVE_SPACES_REGEX,
  SERVER_NAME,
} from 'src/common/constants/strings.constants';

// @UseInterceptors(AuthTokenInterceptor)
@Controller('recados')
// @UsePipes(ParseIntPipe) // usando class Pipe desenvolvida para validação de parâmetro inteiro.
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    @Inject(SERVER_NAME)
    private readonly serverName: string,
    @Inject(REMOVE_SPACES_REGEX)
    private readonly removeSpacesRegex: regexProtocol.RegexProtocol,
    @Inject(ONLY_LOWERCASE_LETTERA_REGEX)
    private readonly onlyLouwercaseLettersRegex: regexProtocol.RegexProtocol,
  ) {}
  // Encontra todos os recados
  // @UseInterceptors(
  //   AuthTokenInterceptor,
  //   //   TimingConnectionInterceptor,
  //   //   AddHeaderInterceptor,
  //   //   ErrorHandlingInterceptor,
  // )
  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto,
    @ReqDataParam('method') method,
  ) {
    console.log(this.serverName);
    console.log(this.removeSpacesRegex.execute(this.serverName));
    console.log(this.onlyLouwercaseLettersRegex.execute(this.serverName));

    console.log(method); // ReqDataParam - criado param/req-data-param.decorator.ts para retornar qq dado da requisição

    const result = await this.recadosService.findAll(paginationDto);
    return result;
  }
  // async findAll(
  //   @Query() paginationDto: PaginationDto,
  //   @UrlParam() url: string,
  // ) {
  //   console.log(url); // UrlParam criado param/url-param.decorator.ts para retornar url
  //   const result = await this.recadosService.findAll(paginationDto);
  //   return result;
  // }
  // async findAll(@Query() paginationDto: PaginationDto) {
  //   // const { limit = 10, page = 1 } = pagination;
  //   // console.log(`Limit: ${limit}, Page: ${page}`);
  //   const result = await this.recadosService.findAll(paginationDto);
  //   // throw new Error('MENSAGEM ERRO - ErrorExceptionFilter');
  //   return result;
  // }

  // Encontra apenas um recado
  @UseInterceptors(ErrorHandlingInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    //console.log(id);
    return this.recadosService.findOne(id);
  }
  // usando o ParseIntPipe direto para validar o parâmetro
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   //console.log(id);
  //   return this.recadosService.findOne(id);
  // }

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
