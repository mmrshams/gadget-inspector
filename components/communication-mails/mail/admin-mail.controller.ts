import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddMailTemplateResponseDto } from './dtos/responses/add-template-response.dto';
import { RemoveMailTemplateResponseDto } from './dtos/responses/remove-template-response.dto';
import { MailService } from './mail.service';

@ApiTags('Communication-mail/admin')
@Controller('/admin-mail')
export class AdminMailController {
  constructor(private readonly mailService: MailService) {}

  @ApiBearerAuth()
  @Post('/upload/:key/template')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: 200,
    type: AddMailTemplateResponseDto,
  })
  async addMailTemplate(
    @UploadedFile() file: Express.Multer.File,
    @Param() params: { key: string },
  ): Promise<AddMailTemplateResponseDto> {
    return this.mailService.uploadMailTemplate(params.key, file);
  }

  @ApiBearerAuth()
  @Delete('/upload/:key/template')
  @ApiResponse({
    status: 200,
    type: RemoveMailTemplateResponseDto,
  })
  async removeMailTemplate(
    @Param() params: { key: string },
  ): Promise<RemoveMailTemplateResponseDto> {
    return this.mailService.removeMailTemplate(params.key);
  }
}
