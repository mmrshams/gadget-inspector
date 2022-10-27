import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Timestamps } from '../../common/db-connections/typeorm/interfaces/timestamps.abstract';
import { RoleEnum } from '../enums/role.enum';

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
  email: string;

  @Column()
  role: RoleEnum;

  @Column()
  password: string;
}
