import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { jobLogicDto } from './job-logic.dto';

export class CreateJobDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: '${seconds} * * * * *' })
  @IsNotEmpty()
  @IsString()
  time: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  jobLogic: jobLogicDto;
}
