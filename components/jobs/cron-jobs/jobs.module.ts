import { Module } from '@nestjs/common';
import { CronJobModule } from './cron-job.module';

@Module({
  imports: [CronJobModule],
  controllers: [],
  providers: [],
})
export class JobsModule {}
