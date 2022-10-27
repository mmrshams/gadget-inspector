import { SetMetadata } from '@nestjs/common';
import { AccessEnum } from '../enums/access.enum';

export const ACCESS_KEY = 'accesses';
export const RequirePermissions = (...accesses: AccessEnum[]) =>
  SetMetadata(ACCESS_KEY, accesses);
