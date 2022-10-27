import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AccessEnum } from '../authorization/enums/access.enum';
import { Timestamps } from './Timestamps.abstract';

@Entity()
export class Accesses extends Timestamps {
  constructor(data: Partial<Accesses>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: AccessEnum;

  @Column()
  origin_id: string;

  @Column()
  group_id: string;
}
