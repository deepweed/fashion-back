import { Injectable } from "@nestjs/common";
import { EmailService } from "../../email/email.service";
import { buildPhoneEmail } from "./messages/phone.email";
import { PhoneCallDto } from "./dto/phone.dto";

@Injectable()
export class PhoneService {
  constructor(private readonly emailService: EmailService) {}

  async sendPhoneToTelegram(phoneData: PhoneCallDto) {
    const html = buildPhoneEmail(phoneData);
    await this.emailService.sendMail(
      "🆕 Новая заявка на обратный звонок",
      html,
    );
    return { success: true };
  }
}
