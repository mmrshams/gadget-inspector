import { Injectable } from '@nestjs/common';

@Injectable()
export class FunctionService {
  getHello(): string {
    return 'Hello World!';
  }
}
