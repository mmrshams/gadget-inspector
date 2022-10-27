export class JobInterface {
  constructor(data: Partial<JobInterface>) {
    Object.assign(this, data);
  }
  id!: string;

  role!: string;
}
