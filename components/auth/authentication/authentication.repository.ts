import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationRepository {
  function(): string {
    throw new Error('Not implemented!');
  }
}
