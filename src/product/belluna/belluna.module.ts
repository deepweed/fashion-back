import { Module } from "@nestjs/common";
import { BellunaService } from "./belluna.service";
import { BellunaController } from "./belluna.controller";
import { PrismaService } from "src/prisma.service";
import { PaginationService } from "src/pagination/pagination.service";

@Module({
  controllers: [BellunaController],
  providers: [BellunaService, PrismaService, PaginationService],
  exports: [BellunaService],
})
export class BellunaModule {}
