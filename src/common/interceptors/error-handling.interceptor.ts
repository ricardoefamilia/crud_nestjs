import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { catchError } from 'rxjs';

export class ErrorHandlingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // console.log('ErrorHandlingInterceptor executado ANTES da requisição');
    // await new Promise(resolve => setTimeout(resolve, 5000));
    return next.handle().pipe(
      catchError(err => {
        if (err instanceof Error) {
          if (err.name === 'NotFoundException') {
            // console.log('Tratamento específico para NotFoundException');
            throw new BadRequestException(err.message);
          }
        } else {
          console.log(
            'ErrorHandlingInterceptor capturou um erro desconhecido:',
            err,
          );
        }
        throw err;
      }),
    );
  }
}
