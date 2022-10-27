import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enums/role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  /**
   * Constructor
   * @param reflector
   */
  constructor(private reflector: Reflector) {}

  /**
   *
   * @param context
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user.user || !user.user.roles || !user.user.roles.length) {
      return false;
    }

    return requiredRoles.every((requiredRole) =>
      user.user.roles.includes(requiredRole),
    );
  }
}
