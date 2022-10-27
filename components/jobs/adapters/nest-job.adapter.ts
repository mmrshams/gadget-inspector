import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { jobLogicDto } from '../cron-jobs/dtos/job-logic.dto';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class NestJobAdapter {
  private readonly logger = new Logger('cron-job');
  private axiosInstance: AxiosInstance;
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  addCronJob(name: string, time: string, logic: jobLogicDto) {
    // note: sample `${seconds} * * * * *` check README.md for more details
    const job = new CronJob(time, async () => {
      await this.cronJobLogic(logic);
      this.logger.warn(`time (${time}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(`job ${name} added for each minute at ${time} seconds!`);
  }

  addInterval(name: string, milliseconds: number, logic: jobLogicDto) {
    const callback = async () => {
      this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
      await this.cronJobLogic(logic);
    };

    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(name, interval);
  }

  async cronJobLogic(meta: jobLogicDto) {
    const { url, verb, body, headers, query } = meta;
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: 10000,
      headers: headers ? headers : {},
      params: query,
    });
    let result;
    if (verb === 'post') {
      result = await this.axiosInstance.post('', body);
    } else if (verb === 'get') {
      result = await this.axiosInstance.get('');
    } else if (verb === 'patch') {
      result = await this.axiosInstance.get('');
    }
    this.logger.warn(`result >> ${JSON.stringify(result.data)}`);
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    this.schedulerRegistry.getCronJobs;
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
    return Array.from(jobs.keys());
  }

  deleteInterval(name: string) {
    this.schedulerRegistry.deleteInterval(name);
    this.logger.warn(`Interval ${name} deleted!`);
  }

  getIntervals() {
    const intervals = this.schedulerRegistry.getIntervals();
    intervals.forEach((key) => this.logger.log(`Interval: ${key}`));
    return intervals;
  }
}
