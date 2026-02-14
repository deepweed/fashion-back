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
import { BellunaService } from "./belluna/belluna.service";
import { FindBellunaProductDto } from "./dto/findBelluna.dto";

@Controller("products")
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly bellunaService: BellunaService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async findAll(@Query() query: FindAllProductDto) {
    return this.productService.findAll(query);
  }

  @Get("belluna")
  async findBelluna(@Query() query: FindBellunaProductDto) {
    return this.bellunaService.findBelluna(query);
  }

  // ADMINS FUCK IT ALL

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get("admin/all") // Новый эндпоинт для админки
  async findAllForAdmin() {
    return this.productService.findAllForAdmin();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    console.log(
      "🔴 ProductController.findOne вызван! id =",
      id,
      "type =",
      typeof id,
    );
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
}
