import { Timestamps } from 'components/common/db-connections/typeorm/interfaces/timestamps.abstract';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ChatStatusEnum } from '../enums/chat-status.enum';
import { ChatTypeEnum } from '../enums/chat-type.enum';

@Entity()
export class Messages extends Timestamps {
  constructor(data: Partial<Messages>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  uuid: string;

  @Column({})
  room_id: string;

  @Column({})
  chat_id: string;

  @Column({})
  user_id: string;

  @Column({})
  parent_id: string;

  @Column({})
  reply_to: string;

  @Column({})
  text: string;

  @Column()
  status: ChatStatusEnum;

  @Column()
  type: ChatTypeEnum;
}
