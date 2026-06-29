import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { EmailModule } from "src/email/email.module";

@Module({
  imports: [EmailModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
