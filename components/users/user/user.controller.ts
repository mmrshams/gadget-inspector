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
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('/')
  async GetUsers(): Promise<any> {
    return this.userService.getUsers();
  }

  @ApiBearerAuth()
  @Post('/')
  async CreateUsers(@Body() body: CreateUserDto): Promise<any> {
    return this.userService.createUser(body);
  }

  @ApiBearerAuth()
  @Delete('/:userId')
  async DeleteUsers(@Param() { userId }: Record<string, string>): Promise<any> {
    return this.userService.deleteUser(userId);
  }

  @ApiBearerAuth()
  @Patch('/:userId')
  async UpdateUsers(
    @Param() { userId }: Record<string, string>,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    return this.userService.updateUser(body, userId);
  }
}
