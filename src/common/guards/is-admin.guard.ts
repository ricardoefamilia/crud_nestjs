import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Role } from './enums/role.enum';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (request.user?.role !== Role.ADMIN) {
      throw new ForbiddenException(
        'Acesso permitido apenas para administradores',
      );
    }

    return true;
  }
}
