import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const now = Date.now(); // Captura o tempo atual
    console.log('TimingConnectionInterceptor executado antes da requisição');
    // await new Promise(resolve => setTimeout(resolve, 5000));
    return next.handle().pipe(
      tap(dados => {
        const elapsed = Date.now() - now; // Calcula o tempo decorrido
        console.log(`Tempo de execução da requisição: ${elapsed}ms`);
        // console.log(`TimingConnectionInterceptor executado após a requisição`);
        // console.log(dados);
      }),
    );
  }
}
