import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendMailResponseDto } from './dtos/responses/send-mail-response.dto';
import { SendMailWithTemplateResponseDto } from './dtos/responses/send-mail-with-template-response.dto';
import { SendMailWithTemplateDto } from './dtos/send-mail-with-template.dto';
import { SendMailDto } from './dtos/send-mail.dto';
import { MailService } from './mail.service';

@ApiTags('Communication-mail/mail')
@Controller('/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiBearerAuth()
  @Post('/send')
  @ApiResponse({
    status: 200,
    type: SendMailResponseDto,
  })
  async sendMail(@Body() body: SendMailDto): Promise<SendMailResponseDto> {
    return this.mailService.simpleSendMail(body);
  }

  @ApiBearerAuth()
  @Post('/send-with-template')
  @ApiResponse({
    status: 200,
    type: SendMailWithTemplateResponseDto,
  })
  async sendMailWithMail(
    @Body() body: SendMailWithTemplateDto,
  ): Promise<SendMailWithTemplateResponseDto> {
    return this.mailService.sendWithTemplate(body);
  }
}
