import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteOneTimeJobDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jobId: string;
}
