import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { CommunicationChatsModule } from './communication-chats/communication-chats.module';
import { CommunicationMailsModule } from './communication-mails/communication-mails.module';
import { Mails } from './communication-mails/entities/mail.entity';
import { Templates } from './communication-mails/entities/template.entity';
import { JobsModule } from './jobs/cron-jobs/jobs.module';
import { Users } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'migrator',
      password: 'migrator',
      database: 'test_gadjet',
      entities: [Users, Mails, Templates],
      synchronize: false,
    }),
    CommonModule,
    UsersModule,
    CommunicationMailsModule,
    CommunicationChatsModule,
    JobsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
