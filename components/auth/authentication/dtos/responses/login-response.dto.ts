import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;
}

export class LoginResponseDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}
