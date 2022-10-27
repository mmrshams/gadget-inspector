import { Timestamps } from 'components/common/db-connections/typeorm/interfaces/timestamps.abstract';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Jobs extends Timestamps {
  constructor(data: Partial<Jobs>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
