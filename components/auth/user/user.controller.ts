import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from 'components/common/get-user-request';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('/')
  async GetUsers(@User() userInfo): Promise<any> {
    // NOTE: DO the action with userInfo (imported as sample)
    return this.userService.getUsers();
  }

  @ApiBearerAuth()
  @Post('/')
  async CreateUsers(@Body() body: CreateUserDto): Promise<any> {
    return this.userService.createUser(body);
  }

  @ApiBearerAuth()
  @Delete('/:userId')
  async DeleteUsers(
    @User() userInfo,
    @Param() { userId }: Record<string, string>,
  ): Promise<any> {
    return this.userService.deleteUser(userId);
  }

  @ApiBearerAuth()
  @Patch('/:userId')
  async UpdateUsers(
    @User() userInfo,
    @Param() { userId }: Record<string, string>,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    // NOTE:
    // user-info  exported data from jwt token
    return this.userService.updateUser(body, userId);
  }
}
