import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

export class ChangeDataInterceptor implements NestInterceptor {
  private readonly cache = new Map();
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    // console.log('ChangeDataInterceptor executado ANTES da requisição');

    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)) {
          return {
            data,
            count: data.length,
          };
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data;
      }),
    );
  }
}
