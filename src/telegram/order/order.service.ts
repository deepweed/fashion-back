// src/telegram/order/order.service.ts
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { buildOrderMessage } from "./messages/order.message";

@Injectable()
export class OrderService {
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;
  private readonly chatId = process.env.TELEGRAM_CHAT_ID;
  private readonly threadId = process.env.TELEGRAM_THREAD_ORDER_ID;

  async sendOrderToTelegram(orderData: any) {
    const message = buildOrderMessage(orderData);

    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

    await axios.post(url, {
      chat_id: this.chatId,
      message_thread_id: this.threadId,
      text: message,
      parse_mode: "Markdown",
    });

    return { success: true };
  }
}
