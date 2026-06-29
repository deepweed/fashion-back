import { Injectable } from "@nestjs/common";
import { EmailService } from "../../email/email.service";
import { buildOrderEmail } from "./messages/order.email";

@Injectable()
export class OrderService {
  constructor(private readonly emailService: EmailService) {}

  async sendOrderToTelegram(orderData: any) {
    const html = buildOrderEmail(orderData);
    await this.emailService.sendMail("🆕 Новый заказ", html);
    return { success: true };
  }
}
