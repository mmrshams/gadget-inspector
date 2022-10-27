import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteJobDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jobId: string;
}
