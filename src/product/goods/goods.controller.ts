import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { GoodsService } from "./goods.service";

@Controller("products/goods")
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get(":href")
  async getProductByHref(@Param("href") href: string) {
    const product = await this.goodsService.findByHref(href);

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    

    return product;
  }
}
