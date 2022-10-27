import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FunctionService } from './function.service';

@ApiTags('Users/functions')
@Controller()
export class FunctionController {
  constructor(private readonly appService: FunctionService) {}

  @ApiBearerAuth()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
