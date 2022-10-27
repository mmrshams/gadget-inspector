import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteIntervalDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  intervalId: string;
}
