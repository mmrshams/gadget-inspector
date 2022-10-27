import { Inject, Injectable } from '@nestjs/common';
import { TypeormRepository } from 'components/common/repos/base-repository-typeorm';
import { Rooms } from '../entities/room.entity';
import { Chats } from '../entities/chat.entity';
import { Users } from '../entities/user.entity';
import { Messages } from '../entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @Inject('TypeormRoomRepository')
    private readonly roomTypeormRepo: TypeormRepository<Rooms>,
    @Inject('TypeormChatRepository')
    private readonly chatTypeormRepo: TypeormRepository<Chats>,
    @Inject('TypeormUserRepository')
    private readonly userTypeormRepo: TypeormRepository<Users>,
    @Inject('TypeormMessageRepository')
    private readonly messageTypeormRepo: TypeormRepository<Messages>,
  ) {}
}
