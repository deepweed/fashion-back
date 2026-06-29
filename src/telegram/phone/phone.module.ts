import { Module } from "@nestjs/common";
import { PhoneService } from "./phone.service";
import { PhoneController } from "./phone.controller";
import { EmailModule } from "../../email/email.module";

@Module({
  imports: [EmailModule],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
