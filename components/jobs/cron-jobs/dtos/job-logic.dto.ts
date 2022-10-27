import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class jobLogicDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  verb: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body?: any;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  query?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  headers?: any;
}
