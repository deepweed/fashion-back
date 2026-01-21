import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { FindAllProductDto } from "./dto/findAll.dto";
import { CreateProductDto } from "src/pagination/dto/product-create.dto";
import { UpdateProductDto } from "src/pagination/dto/update-product.dto";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async findAll(@Query() query: FindAllProductDto) {
    return this.productService.findAll(query);
  }

  // ADMINS FUCK IT ALL

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(+id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.productService.delete(+id);
  }

  @Get("admin/all") // Новый эндпоинт для админки
  async findAllForAdmin() {
    return this.productService.findAllForAdmin();
  }
}
