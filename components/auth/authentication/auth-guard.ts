import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as _ from 'lodash';
import { SetMetadata } from '@nestjs/common';
import { JwtService } from './jwt-helper';

/**
 * Use this decorator for make API public
 * as long as we are setting auth guard global
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Constructor
   *
   * @param reflector
   * @param auth
   */
  constructor(
    private readonly reflector: Reflector,
    private auth: JwtService,
  ) {}

  /**
   * Verify whether this request is for a public endpoint
   *
   * @param context
   * @private
   */
  private isPublic(context: ExecutionContext): boolean {
    return <boolean>(
      this.reflector.get<boolean>('isPublic', context.getHandler())
    );
  }

  /**
   * Verify whether this request came from another server
   *
   * @param request
   * @private
   */
  private isServerSide(request: Request): string {
    return _.get(request, 'headers[api-key]') || '';
  }

  /**
   * Extract bearer token from the given request object
   *
   * @param request
   * @private
   */
  private isBearerProtected(request: Request): string {
    const authorizationHeader = request.headers.authorization || '';
    const bearerWordIndex = authorizationHeader.toLowerCase().indexOf('bearer');
    const bearerToken = authorizationHeader.replace(/^bearer /i, '').trim();
    if (bearerWordIndex > -1 && bearerToken) {
      return bearerToken;
    }
    return '';
  }

  /**
   *
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // If the route is public, return the given request
    if (this.isPublic(context)) {
      return request;
    }

    // Check if the request came from another server
    // Note: all characters on request header should be lower case
    const apiKey = this.isServerSide(request);

    // NOTE : use config class for getting from envs
    // its up to developer to set envs per project
    if (apiKey && 'this.config.API_KEY_AUTH' === apiKey) {
      return request;
    }

    // Check the authorization token if the given request is not for a public
    // route or came from another server
    const bearerToken = this.isBearerProtected(request);
    if (bearerToken) {
      const result = this.auth.authenticateToken(bearerToken);
      request.user = result;
      return request;
    }
    throw new UnauthorizedException('unauthorized!');
  }
}
