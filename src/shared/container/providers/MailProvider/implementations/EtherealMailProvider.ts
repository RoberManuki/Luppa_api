import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/SendMailDTO';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(message: ISendMailDTO): Promise<void> {
    const x = await this.client.sendMail({
      from: {
        name: message.from?.name || 'Equipe GoBarber',
        address: message.from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      subject: message.subject,
      // text: 'test',
      html: await this.mailTemplateProvider.parse(message.templateData),
    });

    console.log('Message sent: %s', x.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(x));
  }
}
