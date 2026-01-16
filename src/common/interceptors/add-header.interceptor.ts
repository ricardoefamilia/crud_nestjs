import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AddHeaderInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.debug('AddHeaderInterceptor executado.');

    const response = context.switchToHttp().getResponse<Response>();
    response.setHeader('X-Custom-Header', 'O valor do cabeçalho');

    return next.handle();
  }
}
