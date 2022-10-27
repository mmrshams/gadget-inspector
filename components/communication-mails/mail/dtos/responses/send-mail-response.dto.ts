import { ApiProperty } from '@nestjs/swagger';

export class SendMailResponseDto {
  @ApiProperty()
  result: { success: boolean };
}
