import { Injectable } from '@nestjs/common';

@Injectable()
export class JobRepository {
  getHello(): string {
    return 'Hello World!';
  }
}
