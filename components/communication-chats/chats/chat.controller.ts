import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';

@ApiTags('Communication-chats/chat')
@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiBearerAuth()
  @Post('/send-with-template')
  @ApiResponse({
    status: 200,
    type: '',
  })
  async sendMessage(@Body() body: any): Promise<any> {
    return {};
  }
}
