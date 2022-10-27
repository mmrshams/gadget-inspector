import { Module } from '@nestjs/common';
import { EntityEnum } from 'components/common/db-connections/typeorm/enums/entity-name.enum';
import { TypeormRepository } from 'components/common/repos/base-repository-typeorm';
import { EntityManager } from 'typeorm';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationRepository } from './authorization.repository';
import { AuthorizationService } from './authorization.service';

// TODO: add adapters and more files based of requirements
@Module({
  imports: [UserModule],
  controllers: [AuthorizationController],
  providers: [
    AuthorizationService,
    AuthorizationRepository,
    UserService,
    UserRepository,
    {
      useFactory: (entityManager: EntityManager) => {
        return new TypeormRepository(EntityEnum.userEntity, entityManager);
      },
      provide: 'TypeormUserRepository',
      inject: [EntityManager],
    },
  ],
})
export class AuthorizationModule {}
