import { Module } from '@nestjs/common';
import { CommonModule } from 'components/common/common.module';
import { CronJobModule } from './cron-jobs/cron-job.module';

// TODO: add adapters and more files based of requirements s
@Module({
  imports: [CronJobModule, CommonModule],
  controllers: [],
  providers: [],
})
export class UsersModule {}
