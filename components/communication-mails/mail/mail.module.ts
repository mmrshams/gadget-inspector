import { Module } from '@nestjs/common';
import { CommonModule } from 'components/common/common.module';
import { EntityEnum } from 'components/common/db-connections/typeorm/enums/entity-name.enum';
import { TypeormRepository } from 'components/common/repos/base-repository-typeorm';
import { EntityManager } from 'typeorm';
import { MailgunSendMailAdapter } from '../adapters/mailgun-send-mail-adapter';
import { SendGridSendMailAdapter } from '../adapters/sendgrind-send-mail-adapter';
import { AdminMailController } from './admin-mail.controller';
import { MailController } from './mail.controller';
import { MailRepository } from './mail.repository';
import { MailService } from './mail.service';

// TODO: add adapters and more files based of requirements
@Module({
  imports: [CommonModule],
  controllers: [MailController, AdminMailController],
  providers: [
    MailService,
    MailRepository,
    {
      useFactory: (entityManager: EntityManager) => {
        return new TypeormRepository(EntityEnum.mailEntity, entityManager);
      },
      provide: 'TypeormEmailRepository',
      inject: [EntityManager],
    },
    {
      useFactory: (entityManager: EntityManager) => {
        return new TypeormRepository(EntityEnum.templateEntity, entityManager);
      },
      provide: 'TypeormTemplateRepository',
      inject: [EntityManager],
    },
    MailgunSendMailAdapter,
    SendGridSendMailAdapter,
  ],
})
export class MailModule {}
