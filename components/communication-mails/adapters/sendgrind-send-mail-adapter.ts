import { sendMailAdapter } from './send-mail-adapter';
import * as sgMail from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SendGridSendMailAdapter extends sendMailAdapter {
  constructor() {
    super();
    this.initiate();
  }

  private _sgMail = sgMail;
  private _origin = 'oshams@s-pro.io';
  private _template = '<strong> eagerly waiting for your reply !!</strong>';

  // NOTE : this should be on env section
  private SENDGRID_API_KEY ='';

  initiate() {
    this._sgMail.setApiKey(this.SENDGRID_API_KEY);
  }

  async send({ receiver, subject, template = this._template }) {
    const msg = {
      from: this._origin,
      to: receiver,
      subject,
      html: template,
    };
    const result = await this._sgMail.send(msg);
    if (result) return { success: true };
  }
}
