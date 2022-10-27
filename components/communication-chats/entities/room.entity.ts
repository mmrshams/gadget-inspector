import { Timestamps } from 'components/common/db-connections/typeorm/interfaces/timestamps.abstract';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoomStatusEnum } from '../enums/room-status.enum';
import { RoomTypeEnum } from '../enums/room-type.enum';

@Entity()
export class Rooms extends Timestamps {
  constructor(data: Partial<Rooms>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  uuid: string;

  @Column()
  user_id: string;

  @Column()
  chat_id: string;

  @Column()
  name: string;

  @Column()
  status: RoomStatusEnum;

  @Column()
  type: RoomTypeEnum;
}
