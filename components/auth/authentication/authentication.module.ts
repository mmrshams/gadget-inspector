import { Module } from '@nestjs/common';
import { EntityEnum } from 'components/common/db-connections/typeorm/enums/entity-name.enum';
import { TypeormRepository } from 'components/common/repos/base-repository-typeorm';
import { EntityManager } from 'typeorm';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationRepository } from './authentication.repository';
import { AuthenticationService } from './authentication.service';
import { JwtService } from './jwt-helper';

// TODO: add adapters and more files based of requirements
@Module({
  imports: [UserModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    AuthenticationRepository,
    UserService,
    UserRepository,
    {
      useFactory: (entityManager: EntityManager) => {
        return new TypeormRepository(EntityEnum.userEntity, entityManager);
      },
      provide: 'TypeormUserRepository',
      inject: [EntityManager],
    },
    JwtService,
  ],
})
export class AuthenticationModule {}
