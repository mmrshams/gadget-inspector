import { sendMailAdapter } from './send-mail-adapter';
import * as mailgun from 'mailgun-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailgunSendMailAdapter extends sendMailAdapter {
  constructor() {
    super();
    this.initiate();
  }

  private _mg;
  private _apiKey = '';
  private _domain = '';
  private _template = '<strong> eagerly waiting for your reply !!</strong>';
  private _sender = '';

  initiate() {
    this._mg = mailgun({
      apiKey: this._apiKey,
      domain: this._domain,
    });
  }

  async send({ receiver, subject, text, template = this._template }) {
    // NOTE: check for usage of template
    const data = {
      from: this._sender,
      to: receiver,
      subject: subject,
      text,
    };
    const result = await this._mg.messages().send(data);
    if (result) return { success: true };
  }
}
