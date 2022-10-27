import { Module } from '@nestjs/common';
import { CommonModule } from 'components/common/common.module';
import { FunctionModule } from './function/function.module';
import { UserModule } from './user/user.module';

// TODO: add adapters and more files based of requirements s
@Module({
  imports: [UserModule, FunctionModule, CommonModule],
  controllers: [],
  providers: [],
})
export class UsersModule {}
