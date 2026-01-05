import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(250)
  readonly texto: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  deId: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  paraId: number;
}
