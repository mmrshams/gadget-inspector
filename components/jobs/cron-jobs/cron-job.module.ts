import { Module } from '@nestjs/common';
import { CommonModule } from 'components/common/common.module';
import { JobController } from './cron-job.controller';
import { JobRepository } from './cron-job.repository';
import { JobService } from './cron-job.service';
import { TypeormRepository } from 'components/common/repos/base-repository-typeorm';
import { EntityManager } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { NestJobAdapter } from '../adapters/nest-job.adapter';
import { EntityEnum } from 'components/common/db-connections/typeorm/enums/entity-name.enum';

// TODO: add adapters and more files based of requirements
@Module({
  imports: [CommonModule, ScheduleModule.forRoot()],
  controllers: [JobController],
  providers: [
    JobService,
    JobRepository,
    NestJobAdapter,
    {
      useFactory: (entityManager: EntityManager) => {
        return new TypeormRepository(EntityEnum.userEntity, entityManager);
      },
      provide: 'TypeormJobRepository',
      inject: [EntityManager],
    },
  ],
})
export class CronJobModule {}
