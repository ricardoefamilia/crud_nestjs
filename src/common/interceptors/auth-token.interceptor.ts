import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuthTokenInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers?.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header ausente');
    }

    const [scheme, token] = authHeader.trim().split(/\s+/);

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Authorization header inválido');
    }

    this.logger.debug('Token Bearer recebido com sucesso');

    // opcional: anexar ao request para uso posterior
    request['token'] = token;

    return next.handle();
  }
}
