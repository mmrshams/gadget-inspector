import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mails } from 'components/communication-mails/entities/mail.entity';
import { Templates } from 'components/communication-mails/entities/template.entity';
import { Users } from 'components/users/entities/user.entity';
import { MongoClient } from 'mongodb';

export const mongoDbProviders = [
  {
    provide: 'MONGODB_PROVIDER',
    useFactory: async () =>
      new Promise((resolve, reject) => {
        MongoClient.connect(
          'mongodb://localhost:27017',
          {},
          (error, client) => {
            if (error) {
              reject(error);
            } else {
              resolve(client);
            }
          },
        );
      }),
  },
];

// TODO: add adapters and more files based of requirements
@Module({
  imports: [
    // TODO: add configs
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
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CommonModule {}
