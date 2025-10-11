import { Injectable } from "@nestjs/common";
import { PaginationService } from "src/pagination/pagination.service";
import { PrismaService } from "src/prisma.service";
import { FindBellunaProductDto } from "../dto/findBelluna.dto";
import { Prisma } from "@prisma/client";
import {
  getPriceOption,
  getSearchOption,
  getSerieOption,
  getSortOption,
  getStockOption,
} from "../filters/commonFilters";
import { convertToNumber } from "utils/convertToNumber";
import {
  getCompressorTypeOption,
  getCoolingCapacityOption,
  getPowerMaxOption,
  getTempRangeOption,
} from "../filters/refrigerationFilters";

@Injectable()
export class BellunaService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async findBelluna(dto: FindBellunaProductDto = {}) {
    const { perPage, skip } = this.paginationService.getPagination(dto);

    const filters = this.createFilter(dto);

    const products = await this.prisma.product.findMany({
      where: { ...filters, type: "FRIDGE_EQUIPMENT" },
      include: {
        refrigeratorStat: true,
        discount: true,
        documents: true,
      },
      orderBy: dto.sort ? getSortOption(dto.sort) : undefined,
      skip,
      take: perPage,
    });

    return {
      products,
      length: await this.prisma.product.count({
        where: { ...filters, type: "FRIDGE_EQUIPMENT" },
      }),
    };
  }

  private createFilter(dto: FindBellunaProductDto): Prisma.ProductWhereInput {
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

    if (dto.compressorType)
      filters.push(getCompressorTypeOption(dto.compressorType));

    if (dto.minPowerMax || dto.maxPowerMax)
      filters.push(
        getPowerMaxOption(
          convertToNumber(dto.minPowerMax),
          convertToNumber(dto.maxPowerMax)
        )
      );

    if (dto.minTemp || dto.maxTemp)
      filters.push(
        getTempRangeOption(
          convertToNumber(dto.minTemp),
          convertToNumber(dto.maxTemp)
        )
      );

    if (dto.minCooling || dto.maxCooling)
      filters.push(
        getCoolingCapacityOption(
          convertToNumber(dto.minCooling),
          convertToNumber(dto.maxCooling)
        )
      );

    if (dto.stock) filters.push(getStockOption(dto.stock));

    return filters.length ? { AND: filters } : {};
  }
}
