import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { of, tap } from 'rxjs';

export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map();
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // console.log('SimpleCacheInterceptor executado ANTES da requisição');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const url = request.url;

    if (this.cache.has(url)) {
      // console.log('Retornando resposta do cache para:', url);
      return of(this.cache.get(url));
    }

    await new Promise(resolve => setTimeout(resolve, 3000));

    return next.handle().pipe(
      tap(response => {
        // console.log('Armazenando resposta no cache para:', url);
        this.cache.set(url, response);
      }),
    );
  }
}
