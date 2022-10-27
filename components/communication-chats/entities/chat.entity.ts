import { Timestamps } from 'components/common/db-connections/typeorm/interfaces/timestamps.abstract';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chats extends Timestamps {
  constructor(data: Partial<Chats>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  uuid: string;

  @Column({})
  name: string;

  @Column()
  status: string;

  @Column()
  type: string;
}
