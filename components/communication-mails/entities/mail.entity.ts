import { Timestamps } from 'components/common/db-connections/typeorm/interfaces/timestamps.abstract';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mails extends Timestamps {
  constructor(data: Partial<Mails>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  uuid: string;

  @Column()
  content: string;

  @Column()
  receiver_email: string;

  @Column()
  subject: string;

  @Column()
  sent_at: string;

  // NOTE: prepare enum for status
  @Column()
  status: string;

  @Column()
  type: string;
}
