import { Module } from '@nestjs/common';
import { CommonModule } from 'components/common/common.module';
import { EntityEnum } from 'components/common/db-connections/typeorm/enums/entity-name.enum';
import { TypeormRepository } from 'components/common/repos/base-repository-typeorm';
import { EntityManager } from 'typeorm';
import { UserModule } from '../user/user.module';
import { ChatController } from './chat.controller';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';

// TODO: add adapters and more files based of requirements
@Module({
  imports: [CommonModule, UserModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatRepository,
    {
      useFactory: (entityManager: EntityManager) => {
        return new TypeormRepository(EntityEnum.roomEntity, entityManager);
      },
      provide: 'TypeormRoomRepository',
      inject: [EntityManager],
    },
    {
      useFactory: (entityManager: EntityManager) => {
        return new TypeormRepository(EntityEnum.chatEntity, entityManager);
      },
      provide: 'TypeormChatRepository',
      inject: [EntityManager],
    },
    {
      useFactory: (entityManager: EntityManager) => {
        return new TypeormRepository(EntityEnum.userEntity, entityManager);
      },
      provide: 'TypeormUserRepository',
      inject: [EntityManager],
    },
    {
      useFactory: (entityManager: EntityManager) => {
        return new TypeormRepository(EntityEnum.messageEntity, entityManager);
      },
      provide: 'TypeormMessageRepository',
      inject: [EntityManager],
    },
  ],
})
export class ChatModule {}
