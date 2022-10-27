import { Inject, Injectable } from '@nestjs/common';
import { TypeormRepository } from 'components/common/repos/base-repository-typeorm';
import { MailgunSendMailAdapter } from '../adapters/mailgun-send-mail-adapter';
import { SendGridSendMailAdapter } from '../adapters/sendgrind-send-mail-adapter';
import { Mails } from '../entities/mail.entity';
import { SendMailDto } from './dtos/send-mail.dto';
import * as uuid from 'uuid';
import * as fs from 'fs';
import { Templates } from '../entities/template.entity';
import { SendMailWithTemplateDto } from './dtos/send-mail-with-template.dto';
import * as handlebars from 'handlebars';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(
    @Inject('TypeormEmailRepository')
    private readonly MailTypeormRepo: TypeormRepository<Mails>,
    @Inject('TypeormTemplateRepository')
    private readonly templateTypeormRepo: TypeormRepository<Templates>,
    // NOTE: we can easily change third party by writing new adapter
    private readonly sendMail: MailgunSendMailAdapter,
    private readonly gridSendMail: SendGridSendMailAdapter,
  ) {}

  private async getTemplate(
    fileName: string,
    content: Record<string, unknown>,
  ) {
    const templatePath = path.join(__dirname, '..', '..', '..', 'templates');
    const source = await fs.promises.readFile(
      path.join(templatePath, `${fileName}.hbs`),
      'utf8',
    );
    const template = handlebars.compile(source);
    return template({
      ...content,
    });
  }

  async simpleSendMail(
    data: SendMailDto,
  ): Promise<{ result: { success: boolean } }> {
    const { email, subject, content } = data;
    const mailData = await this.MailTypeormRepo.create(
      new Mails({
        uuid: uuid.v4(),
        subject,
        content,
        receiver_email: email,
        status: 'initiate',
        type: 'test',
        sent_at: Date.now().toString(),
      }),
    );
    const result = await this.gridSendMail.send({
      receiver: email,
      subject,
    });

    if (result) {
      mailData.status = 'sent';
      await this.MailTypeormRepo.update(
        mailData.id,
        new Mails({ ...mailData }),
      );
    }
    return { result };
  }

  async sendWithTemplate(
    data: SendMailWithTemplateDto,
  ): Promise<{ result: { success: boolean } }> {
    const { email, subject, templateId, content } = data;
    const templateInfo = await this.templateTypeormRepo.findOne({
      uuid: templateId,
    });
    const template = await this.getTemplate(templateInfo.key, content);
    const mailData = await this.MailTypeormRepo.create(
      new Mails({
        uuid: uuid.v4(),
        subject,
        content: JSON.stringify(content),
        receiver_email: email,
        status: 'initiate',
        type: 'test',
        sent_at: Date.now().toString(),
      }),
    );
    const result = await this.gridSendMail.send({
      receiver: email,
      subject,
      template,
    });
    // const result2 = await this._sendMail.send({
    //   receiver: email,
    //   subject,
    //   text: content,
    //   template,
    // });
    if (result) {
      mailData.status = 'sent';
      await this.MailTypeormRepo.update(
        mailData.id,
        new Mails({ ...mailData }),
      );
    }
    return { result };
  }

  async uploadMailTemplate(key: string, file: Express.Multer.File) {
    const buffer = file.buffer;
    const data = await this.templateTypeormRepo.create(
      new Templates({
        status: 'Draft',
        key,
      }),
    );
    await fs.promises.writeFile(
      `./components/communication-mail/templates/${key}.hbs`,
      buffer,
    );
    return { message: 'template successfully added!', template: data };
  }

  async removeMailTemplate(key: string) {
    await this.templateTypeormRepo.delete({ key });
    await fs.unlinkSync(`./components/communication-mail/templates/${key}.hbs`);
    return { success: true };
  }
}
