import { Inject, Injectable } from '@nestjs/common';
import { TypeormRepository } from 'components/common/repos/base-repository-typeorm';

import { Users } from '../entities/user.entity';
@Injectable()
export class AuthorizationService {
  constructor(
    @Inject('TypeormUserRepository')
    private readonly UserTypeormRepo: TypeormRepository<Users>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async updateUser(userId: string, data): Promise<boolean> {
    const { role } = data;
    await this.UserTypeormRepo.update(userId, { role });
    return true;
  }

  async addAccess(userId: string, data): Promise<boolean> {
    const { role } = data;
    await this.UserTypeormRepo.update(userId, { role });
    return true;
  }

  async removeAccess(userId: string, data): Promise<boolean> {
    const { role } = data;
    await this.UserTypeormRepo.update(userId, { role });
    return true;
  }

  async getAccess(userId: string): Promise<boolean> {
    await this.UserTypeormRepo.update(userId, {});
    return true;
  }
}
