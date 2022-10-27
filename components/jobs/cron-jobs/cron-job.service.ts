import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TypeormRepository } from 'components/common/repos/base-repository-typeorm';
import { NestJobAdapter } from '../adapters/nest-job.adapter';
import { Jobs } from '../entities/job.entity';
import { CreateJobDto } from './dtos/create-cron-job.dto';
import { CreateIntervalDto } from './dtos/create-interval.dto';
import { CreateOneTimeJobDto } from './dtos/create-one-tIme-job.dto';
import { DeleteJobDto } from './dtos/delete-cron-job.dto';
import { DeleteIntervalDto } from './dtos/delete-interval.dto';
import { DeleteOneTimeJobDto } from './dtos/delete-one-tIme-job.dto';

@Injectable()
export class JobService {
  constructor(private readonly nestJobAdapter: NestJobAdapter) {}
  getHello(): string {
    return 'Hello World!';
  }

  async addOneTimeJob(data: CreateOneTimeJobDto): Promise<any> {
    throw new InternalServerErrorException('not implemented!');
  }

  async removeOneTimeJob({ jobId }: DeleteOneTimeJobDto): Promise<any> {
    throw new InternalServerErrorException('not implemented!');
  }

  async listOfTimeJob({ jobId }: DeleteOneTimeJobDto): Promise<any> {
    throw new InternalServerErrorException('not implemented!');
  }

  async addJob(data: CreateJobDto): Promise<void> {
    const { name, time, jobLogic } = data;
    return this.nestJobAdapter.addCronJob(name, time, jobLogic);
  }

  async removeJob({ jobId }: DeleteJobDto): Promise<any> {
    return this.nestJobAdapter.deleteCron(jobId);
  }

  async addInterval(data: CreateIntervalDto): Promise<void> {
    const { name, milliseconds, jobLogic } = data;
    return this.nestJobAdapter.addInterval(
      name,
      parseInt(milliseconds),
      jobLogic,
    );
  }

  async removeInterval({ intervalId }: DeleteIntervalDto): Promise<any> {
    return this.nestJobAdapter.deleteInterval(intervalId);
  }

  async listOfIntervals(): Promise<string[]> {
    return this.nestJobAdapter.getIntervals();
  }

  async listOfJobs(): Promise<Array<string>> {
    return this.nestJobAdapter.getCrons();
  }
}
