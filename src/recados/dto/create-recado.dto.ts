import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRecadoDto {
  @IsString({
    message: 'O texto do recado deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O campo "texto" é obrigatório',
  })
  @MinLength(5, {
    message: 'O campo "texto" deve ter no mínimo 5 caracteres',
  })
  @MaxLength(250, {
    message: 'O campo "texto" deve ter no máximo 250 caracteres',
  })
  readonly texto: string;

  @IsString({
    message: 'O campo "de" deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O campo "de" é obrigatório',
  })
  @MinLength(2, {
    message: 'O campo "de" deve ter no mínimo 2 caracteres',
  })
  @MaxLength(150, {
    message: 'O campo "de" deve ter no máximo 150 caracteres',
  })
  readonly de: string;

  @IsString({
    message: 'O campo "para" deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O campo "para" é obrigatório',
  })
  @MinLength(2, {
    message: 'O campo "para" deve ter no mínimo 2 caracteres',
  })
  @MaxLength(150, {
    message: 'O campo "para" deve ter no máximo 150 caracteres',
  })
  readonly para: string;
}
