import { Inject, Injectable } from '@nestjs/common';
import { TypeormRepository } from 'components/common/repos/base-repository-typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Users } from '../entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('TypeormUserRepository')
    private readonly UserTypeormRepo: TypeormRepository<Users>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createUser(data: CreateUserDto): Promise<Users> {
    const { email, name, password } = data;
    const createdUser = await this.UserTypeormRepo.create(
      new Users({
        name,
        email,
        password,
      }),
    );
    return createdUser;
  }

  async updateUser(data: UpdateUserDto, userId: string): Promise<UpdateResult> {
    const { name } = data;
    const updatedUser = await this.UserTypeormRepo.update(userId, {
      name,
    });
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<DeleteResult> {
    const success = await this.UserTypeormRepo.delete({ id: userId });
    return success;
  }

  async getUsers(): Promise<Users[]> {
    const Users = await this.UserTypeormRepo.findAll({});
    return Users;
  }
}
