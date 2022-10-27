import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { RoleEnum } from '../authorization/enums/role.enum';

@Injectable()
export class JwtService {
  // NOTE: you can use generateToken for generate private key
  private privateKey = '5bcf22629fdcec9041ee';

  // NOTE: the way of token generation
  // in real project you need to generate this token once and
  // keep it in envs
  generateToken() {
    return crypto.randomBytes(10).toString('hex');
  }

  generateAccessToken(userId: string, role: RoleEnum) {
    return jwt.sign({ userId, roles: [role] }, this.privateKey, {
      expiresIn: '10h',
    });
  }

  authenticateToken(token) {
    if (token == null) throw new UnauthorizedException('unauthorized!');
    let result;
    jwt.verify(token, this.privateKey, (err: any, user: any) => {
      if (err) throw new UnauthorizedException('unauthorized!');
      result = { success: true, user };
    });
    return result;
  }
}
