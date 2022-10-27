import { ApiProperty } from '@nestjs/swagger';

export class SendMailWithTemplateResponseDto {
  @ApiProperty()
  result: { success: boolean };
}
