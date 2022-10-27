import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { UserModule } from './user/user.module';

// TODO: add adapters and more files based of requirements
@Module({
  imports: [UserModule, AuthenticationModule, AuthorizationModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
