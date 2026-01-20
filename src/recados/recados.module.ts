import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import { CommonModule } from 'src/common/common.module';
import {
  ONLY_LOWERCASE_LETTERA_REGEX,
  REMOVE_SPACES_REGEX,
} from 'src/common/constants/strings.constants';
import { OnlyLowercaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]), PessoasModule, CommonModule],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: ONLY_LOWERCASE_LETTERA_REGEX, // o provide não pode utilizar interface, mas pode com classe abstrata
      useClass: OnlyLowercaseLettersRegex,
    },
    {
      provide: REMOVE_SPACES_REGEX, // o provide não pode utilizar interface, mas pode com classe abstrata
      useClass: RemoveSpacesRegex,
    },
  ],
})
export class RecadosModule {}
