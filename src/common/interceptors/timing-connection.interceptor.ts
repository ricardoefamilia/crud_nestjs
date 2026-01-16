import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { delay, tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const now = Date.now(); // Captura o tempo atual
    console.log('TimingConnectionInterceptor executado antes da requisição');
    return next.handle().pipe(
      delay(5000),
      tap(dados => {
        const elapsed = Date.now() - now; // Calcula o tempo decorrido
        console.log(`Tempo de execução da requisição: ${elapsed}ms`);
        console.log(`TimingConnectionInterceptor executado após a requisição`);
        console.log(dados);
      }),
    );
  }
}
