import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendMail(subject: string, html: string) {
    await this.transporter.sendMail({
      from: `"Proholod" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject,
      html,
    });
  }
}
