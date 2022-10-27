import { Body, Controller, Get, Post, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'components/users/user/dtos/create-user.dto';
import { Public } from './auth-guard';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dtos/login.dto';
import { LoginResponseDto } from './dtos/responses/login-response.dto';
import { SignupResponseDto } from './dtos/responses/signup-response.dto';

@ApiTags('Auth/authentication')
@Controller('/auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('/sign-up')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SignupResponseDto,
  })
  async signUp(@Body() body: CreateUserDto): Promise<SignupResponseDto> {
    return this.authenticationService.signUp(body);
  }

  @Public()
  @Post('/login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: LoginResponseDto,
  })
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    return this.authenticationService.login(body);
  }
}
