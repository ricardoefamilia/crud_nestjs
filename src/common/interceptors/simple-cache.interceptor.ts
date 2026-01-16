import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap, delay } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly logger = new Logger(SimpleCacheInterceptor.name);
  private readonly cache = new Map<string, unknown>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const cacheKey = request.originalUrl;

    if (this.cache.has(cacheKey)) {
      this.logger.debug(`Cache HIT para ${cacheKey}`);
      return of(this.cache.get(cacheKey));
    }

    this.logger.debug(`Cache MISS para ${cacheKey}`);

    // simula latência (exemplo didático)
    return next.handle().pipe(
      delay(3000),
      tap(response => {
        this.logger.log(`Armazenando resposta no cache para ${cacheKey}`);
        this.cache.set(cacheKey, response);
      }),
    );
  }
}
