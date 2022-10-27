import { Module } from '@nestjs/common';
import { ChatModule } from './chats/chat.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [ChatModule, UserModule],
  controllers: [],
  providers: [],
})
export class CommunicationChatsModule {}
