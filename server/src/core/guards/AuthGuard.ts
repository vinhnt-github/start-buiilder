import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUCLIC_KEY } from '../decorator/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride(IS_PUCLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isPublicClass = this.reflector.get(IS_PUCLIC_KEY, context.getClass());
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-api-user-id'];

    if (!userId || Number.isNaN(userId) || !Number.isInteger(+userId)) {
      throw new UnauthorizedException();
    }
    request['userId'] = Number.parseInt(userId);
    return true;
  }
}
