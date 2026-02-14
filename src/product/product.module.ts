import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { PrismaService } from "src/prisma.service";
import { PaginationService } from "src/pagination/pagination.service";
import { PaginationModule } from "src/pagination/pagination.module";
import { GoodsModule } from "./goods/goods.module";
import { BellunaService } from "./belluna/belluna.service";

@Module({
  imports: [PaginationModule, GoodsModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, PaginationService, BellunaService],
})
export class ProductModule {}
