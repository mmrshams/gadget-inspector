import { ApiProperty } from '@nestjs/swagger';

export class RemoveMailTemplateResponseDto {
  @ApiProperty()
  success: boolean;
}
