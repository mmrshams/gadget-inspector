import { Column, Entity, PrimaryColumn } from 'typeorm';
import { RoleEnum } from '../authorization/enums/role.enum';
import { Timestamps } from './Timestamps.abstract';

@Entity()
export class Users extends Timestamps {
  constructor(data: Partial<Users>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  role: RoleEnum;

  @Column()
  email: string;

  @Column()
  password: string;
}
