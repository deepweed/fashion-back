import { Controller, Post, Body } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller("telegram/order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderData: any) {
    console.log("📦 Получен заказ:", orderData);
    return this.orderService.sendOrderToTelegram(orderData);
  }
}
