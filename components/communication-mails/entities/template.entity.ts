import { Timestamps } from 'components/common/db-connections/typeorm/interfaces/timestamps.abstract';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Templates extends Timestamps {
  constructor(data: Partial<Templates>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  uuid: string;

  @Column({ unique: true })
  key: string;

  @Column()
  status: string;
}
