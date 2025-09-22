import { Injectable } from "@nestjs/common";
import { PaginationService } from "src/pagination/pagination.service";
import { PrismaService } from "src/prisma.service";
import { EProductPriceSort, FindAllProductDto } from "../dto/findAll.dto";
import {
  getPriceOption,
  getSearchOption,
  getSerieOption,
  getSortOption,
  getStockOption,
} from "../filters/commonFilters";
import { Prisma } from "@prisma/client";
import { convertToNumber } from "utils/convertToNumber";
import {
  getBCompressorType,
  getBRefrigerantType,
  getBTempRangeOption,
} from "../filters/bellunaFilters";

@Injectable()
export class BellunaService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async findBelluna(dto: FindAllProductDto = {}) {
    const { perPage, skip } = this.paginationService.getPagination(dto);

    const filters = this.createFilter(dto);

    const products = await this.prisma.product.findMany({
      where: {
        AND: [filters, { type: "FRIDGE_EQUIPMENT" }],
      },
      include: {
        refrigeratorStat: true,
      },
      orderBy: getSortOption(dto.sort ?? EProductPriceSort.LOW_PRICE),
      skip,
      take: perPage,
    });

    return {
      products,
      length: await this.prisma.product.count({
        where: {
          AND: [filters, { type: "FRIDGE_EQUIPMENT" }],
        },
      }),
    };
  }

  private createFilter(dto: FindAllProductDto): Prisma.ProductWhereInput {
    const filters: Prisma.ProductWhereInput[] = [];

    if (dto.search) filters.push(getSearchOption(dto.search));

    if (dto.serie) filters.push(getSerieOption(dto.serie));

    if (dto.minPrice || dto.maxPrice)
      filters.push(
        getPriceOption(
          convertToNumber(dto.minPrice),
          convertToNumber(dto.maxPrice)
        )
      );

    if (dto.stock) filters.push(getStockOption(dto.stock));

    if (dto.minTempRange || dto.maxTempRange)
      filters.push(
        getBTempRangeOption(
          convertToNumber(dto.minTempRange),
          convertToNumber(dto.maxTempRange)
        )
      );

    if (dto.refrigerant) filters.push(getBRefrigerantType(dto.refrigerant));

    if (dto.compressorType)
      filters.push(getBCompressorType(dto.compressorType));

    return filters.length ? { AND: filters } : {};
  }
}
