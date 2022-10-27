import { Module } from '@nestjs/common';
import { FunctionController } from './function.controller';
import { FunctionService } from './function.service';

// TODO: add adapters and more files based of requirements
@Module({
  imports: [],
  controllers: [FunctionController],
  providers: [FunctionService],
})
export class FunctionModule {}
