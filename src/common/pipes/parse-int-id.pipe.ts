import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value as unknown as number;
    }

    const parsedValue = Number.parseInt(value, 10);

    if (Number.isNaN(parsedValue)) {
      throw new BadRequestException(
        'O parâmetro "id" deve ser um número inteiro',
      );
    }

    if (parsedValue <= 0) {
      throw new BadRequestException(
        'O parâmetro "id" deve ser um número inteiro positivo',
      );
    }

    return parsedValue;
  }
}
