import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationRepository {
  function(): string {
    throw new Error('Not implemented!');
  }
}
