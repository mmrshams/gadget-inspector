import { Injectable } from '@nestjs/common';

@Injectable()
export class MailRepository {
  getHello(): string {
    return 'Hello World!';
  }
}
