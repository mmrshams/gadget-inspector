import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  getHello(): string {
    return 'Hello World!';
  }
}
