import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatRepository {
  getHello(): string {
    return 'Hello World!';
  }
}
