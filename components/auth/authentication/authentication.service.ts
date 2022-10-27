import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TypeormRepository } from 'components/common/repos/base-repository-typeorm';

import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from './jwt-helper';
import { Users } from '../entities/user.entity';
@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('TypeormUserRepository')
    private readonly UserTypeormRepo: TypeormRepository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async signUp(data: SignUpDto): Promise<any> {
    const { email, name, password } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await this.UserTypeormRepo.create(
      new Users({
        name,
        email,
        password: hashedPassword,
      }),
    );
    const token = this.jwtService.generateAccessToken(email, createdUser.role);
    return { ...createdUser, token };
  }

  async login(data: LoginDto): Promise<any> {
    const { email, password } = data;
    const currentUser = await this.UserTypeormRepo.findOne({ email });
    if (!currentUser) throw new UnauthorizedException('unauthorized!');

    const validPassword = await bcrypt.compare(password, currentUser.password);
    if (!validPassword) throw new UnauthorizedException('unauthorized!');

    delete currentUser.password;
    return {
      user: currentUser,
      token: this.jwtService.generateAccessToken(email, currentUser.role),
    };
  }
}
