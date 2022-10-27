import { Injectable } from '@nestjs/common';

@Injectable()
export class FunctionRepository {
  getHello(): string {
    return 'Hello World!';
  }
}
