import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { JobService } from './cron-job.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateIntervalDto } from './dtos/create-interval.dto';
import { CreateJobDto } from './dtos/create-cron-job.dto';
import { DeleteIntervalDto } from './dtos/delete-interval.dto';
import { DeleteJobDto } from './dtos/delete-cron-job.dto';

@ApiTags('Cron-Jobs')
@Controller('/cron-jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiBearerAuth()
  @Post('/jobs')
  async AddJob(@Body() body: CreateJobDto): Promise<any> {
    return this.jobService.addJob(body);
  }

  @ApiBearerAuth()
  @Delete('/jobs/:jobId')
  async DeleteJob(@Param() { jobId }: DeleteJobDto): Promise<any> {
    return this.jobService.removeJob({ jobId });
  }

  @ApiBearerAuth()
  @Get('/jobs')
  async ListOfJobs(): Promise<any> {
    return this.jobService.listOfJobs();
  }

  @ApiBearerAuth()
  @Post('/intervals')
  async AddInterval(@Body() body: CreateIntervalDto): Promise<any> {
    return this.jobService.addInterval(body);
  }

  @ApiBearerAuth()
  @Delete('/intervals/:intervalId')
  async DeleteInterval(
    @Param() { intervalId }: DeleteIntervalDto,
  ): Promise<any> {
    return this.jobService.removeInterval({ intervalId });
  }

  @ApiBearerAuth()
  @Get('/intervals')
  async ListOfIntervals(): Promise<any> {
    return this.jobService.listOfIntervals();
  }
}
