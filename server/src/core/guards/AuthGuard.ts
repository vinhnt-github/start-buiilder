/* 
  This file defines an AuthGuard class 
  that implements the CanActivate interface to handle authorization logic in a NestJS application.
*/

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

  /**
   * Determines if the current request is authorized to proceed.
   * @param context - The execution context of the request.
   * @returns A boolean indicating if the request is authorized.
   */
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride(IS_PUCLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
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
