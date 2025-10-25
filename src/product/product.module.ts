import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { PrismaService } from "src/prisma.service";
import { PaginationService } from "src/pagination/pagination.service";
import { PaginationModule } from "src/pagination/pagination.module";
import { BellunaModule } from './belluna/belluna.module';
import { GoodsModule } from './goods/goods.module';

@Module({
  imports: [PaginationModule, BellunaModule, GoodsModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, PaginationService],
})
export class ProductModule {}
