import { Injectable } from "@nestjs/common";
import axios from "axios";
import { buildPhoneMessage } from "./messages/phone.message";
import { PhoneCallDto } from "./dto/phone.dto";

@Injectable()
export class PhoneService {
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN;
  private readonly chatId = process.env.TELEGRAM_CHAT_ID;
  private readonly threadId = process.env.TELEGRAM_THREAD_CALL_ID;

  async sendPhoneToTelegram(phoneData: PhoneCallDto) {
    const message = buildPhoneMessage(phoneData);

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
