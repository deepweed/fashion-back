import { Body, Controller, Post } from "@nestjs/common";
import { PhoneService } from "./phone.service";
import { PhoneCallDto } from "./dto/phone.dto";

@Controller("telegram/phone")
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post()
  async createPhone(@Body() phoneData: PhoneCallDto) {
    return this.phoneService.sendPhoneToTelegram(phoneData);
  }
}
