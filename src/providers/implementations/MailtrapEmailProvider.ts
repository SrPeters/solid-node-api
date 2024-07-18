import Mail from "nodemailer/lib/mailer";
import { IEmailProvider, IMessage } from "../interfaces/IEmailProvider";
import nodemailer from 'nodemailer'

export class MailtrapEmailProvider implements IEmailProvider {
  private readonly transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '123456',
        pass: '123456'
      }
    })
  }
  
  async sendEmail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.body
    })
  }
}