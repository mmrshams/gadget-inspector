import { Column, BeforeInsert, BeforeUpdate } from 'typeorm';

export abstract class Timestamps {
  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @BeforeInsert()
  private setTimestamps(): void {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  private updateTimestamp(): void {
    this.updated_at = new Date();
  }
}
