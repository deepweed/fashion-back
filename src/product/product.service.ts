import { Injectable } from "@nestjs/common";
import { PaginationService } from "src/pagination/pagination.service";
import { PrismaService } from "src/prisma.service";
import { EProductPriceSort, FindAllProductDto } from "./dto/findAll.dto";
import {
  getPriceOption,
  getSearchOption,
  getSerieOption,
  getSortOption,
  getStockOption,
} from "./filters/commonFilters";
import { Prisma } from "@prisma/client";
import { convertToNumber } from "utils/convertToNumber";
import {
  getAreaCoverageOption,
  getBrandOption,
  getCoolingCapacityOption,
  getEnergyEfficiencyOption,
  getHeatingCapacityOption,
  getInverterOption,
  getRefrigerantTypeOption,
  getTypeOfOption,
  getWiFiOption,
} from "./filters/conditionerFilters";

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async findAll(dto: FindAllProductDto = {}) {
    const { perPage, skip } = this.paginationService.getPagination(dto);

    const filters = this.createFilter(dto);

    const products = await this.prisma.product.findMany({
      where: filters,
      include: {
        airConditionerStat: true,
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
        where: filters,
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

    if (dto.brands) filters.push(getBrandOption(dto.brands));

    if (dto.typeOf) filters.push(getTypeOfOption(dto.typeOf));

    if (dto.inverter) filters.push(getInverterOption(dto.inverter));

    if (dto.wifi) filters.push(getWiFiOption(dto.wifi));

    if (dto.minCoolingC || dto.maxCoolingC)
      filters.push(
        getCoolingCapacityOption(
          convertToNumber(dto.minCoolingC),
          convertToNumber(dto.maxCoolingC)
        )
      );

    if (dto.minHeatingC || dto.maxHeatingC)
      filters.push(
        getHeatingCapacityOption(
          convertToNumber(dto.minHeatingC),
          convertToNumber(dto.maxHeatingC)
        )
      );

    if (dto.minArea || dto.maxArea)
      filters.push(
        getAreaCoverageOption(
          convertToNumber(dto.minArea),
          convertToNumber(dto.maxArea)
        )
      );

    if (dto.energyEfficiency)
      filters.push(getEnergyEfficiencyOption(dto.energyEfficiency));

    if (dto.refrigerantType)
      filters.push(getRefrigerantTypeOption(dto.refrigerantType));

    return filters.length ? { AND: filters } : {};
  }
}
