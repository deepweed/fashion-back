import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { FindAllProductDto } from "./dto/findAll.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async findAll(@Query() query: FindAllProductDto) {
    return this.productService.findAll(query);
  }
}
