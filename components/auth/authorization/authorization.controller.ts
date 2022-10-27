import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'components/common/get-user-request';
import { AuthorizationService as AuthorizationService } from './authorization.service';
import { UpdateUserRoleDto } from './dtos/updateUserRole.dto';
import { UpdateUserRoleParamDto } from './dtos/updateUserRoleParam.dto';
import { AccessEnum } from './enums/access.enum';
import { RoleEnum } from './enums/role.enum';
import { RequirePermissions } from './rbac/permissions.decorator';
import { Roles } from './rbac/roles.decorator';

@ApiTags('Auth/authorization')
@Controller('/auth')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  // TODO: authorization RBAC model test
  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @Get('/role/test')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  async TestRole(): Promise<{ success: boolean }> {
    return { success: true };
  }

  // TODO: authorization clam-based model test
  // This will be like role decorator but instead of role we keep access
  @RequirePermissions(AccessEnum.createStaff)
  @ApiBearerAuth()
  @Get('/access/test')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  async TestAccess(@User() userInfo): Promise<{ success: boolean }> {
    return { success: true };
  }

  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth()
  @Patch('/:userId/role')
  async updateRole(
    @Param() { userId }: UpdateUserRoleParamDto,
    @Body() body: UpdateUserRoleDto,
  ): Promise<{ success: true }> {
    await this.authorizationService.updateUser(userId, body);
    return { success: true };
  }

  @ApiBearerAuth()
  @Get(':userId/access')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  async GetUserAccess(
    @Param() { userId }: Record<string, string>,
  ): Promise<{ success: boolean }> {
    await this.authorizationService.getAccess(userId);
    return { success: true };
  }

  @ApiBearerAuth()
  @Post(':userId/access')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  async addAccess(
    @Param() { userId }: Record<string, string>,
    @Body() body: { accesses: Array<string> },
  ): Promise<{ success: true }> {
    await this.authorizationService.addAccess(userId, body);
    return { success: true };
  }

  @ApiBearerAuth()
  @Delete(':userId/access/:accessId')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
  })
  async removeAccess(
    @Param() { userId, accessId }: Record<string, string>,
  ): Promise<{ success: true }> {
    await this.authorizationService.removeAccess(userId, accessId);
    return { success: true };
  }
}
