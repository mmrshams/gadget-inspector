import { Module } from '@nestjs/common';
import { CommonModule } from 'components/common/common.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { TypeormRepository } from 'components/common/repos/base-repository-typeorm';
import { EntityManager } from 'typeorm';
import { EntityEnum } from 'components/common/db-connections/typeorm/enums/entity-name.enum';

// TODO: add adapters and more files based of requirements
@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [
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
  exports: [UserService],
})
export class UserModule {}
