import { ApiProperty } from '@nestjs/swagger';
import { Templates } from 'components/communication-mails/entities/template.entity';

export class AddMailTemplateResponseDto {
  @ApiProperty()
  template: Templates;

  @ApiProperty()
  message: string;
}
