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
import { Brands, Prisma, TypeOf } from "@prisma/client";
import { convertToNumber } from "utils/convertToNumber";

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
      },
      orderBy: this._getSortOption(dto.sort ?? EProductPriceSort.LOW_PRICE),
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

  /* TODO: Слишком много строк, вынести все фильтры от сюда, импортировать их и радоваться. */

  private createFilter(dto: FindAllProductDto): Prisma.ProductWhereInput {
    const filters: Prisma.ProductWhereInput[] = [];

    if (dto.search) filters.push(this._getSearchOption(dto.search));

    if (dto.serie) filters.push(this._getSerieOption(dto.serie));

    if (dto.minPrice || dto.maxPrice)
      filters.push(
        this._getPriceOption(
          convertToNumber(dto.minPrice),
          convertToNumber(dto.maxPrice)
        )
      );

    if (dto.stock) filters.push(this._getStockOption(dto.stock));

    if (dto.brand) filters.push(this._getBrandOption(dto.brand));

    if (dto.typeOf) filters.push(this._getTypeOfOption(dto.typeOf));

    if (dto.inverter) filters.push(this._getInverterOption(dto.inverter));

    if (dto.wifi) filters.push(this._getWiFiOption(dto.wifi));

    if (dto.minCoolingC || dto.maxCoolingC)
      filters.push(
        this._getCoolingCapacityOption(
          convertToNumber(dto.minCoolingC),
          convertToNumber(dto.maxCoolingC)
        )
      );

    if (dto.minHeatingC || dto.maxHeatingC)
      filters.push(
        this._getHeatingCapacityOption(
          convertToNumber(dto.minHeatingC),
          convertToNumber(dto.maxHeatingC)
        )
      );

    if (dto.minArea || dto.maxArea)
      filters.push(
        this._getAreaCoverageOption(
          convertToNumber(dto.minArea),
          convertToNumber(dto.maxArea)
        )
      );

    if (dto.energyEfficiency)
      filters.push(this._getEnergyEfficiencyOption(dto.energyEfficiency));

    if (dto.refrigerantType)
      filters.push(this._getRefrigerantTypeOption(dto.refrigerantType));

    return filters.length ? { AND: filters } : {};
  }

  /* imported from commonFilters, переиспользуемые фильтры вынесены туда */

  private _getSortOption = getSortOption;
  private _getSearchOption = getSearchOption;
  private _getSerieOption = getSerieOption;
  private _getPriceOption = getPriceOption;
  private _getStockOption = getStockOption;

  private _getBrandOption(brand: string): Prisma.ProductWhereInput {
    const brandArray = brand.split("|") as Brands[];

    return {
      AND: [
        {
          brand: { in: brandArray },
        },
        {
          brand: { not: Brands.BELLUNA },
        },
      ],
    };
  }

  private _getTypeOfOption(typeOf: string): Prisma.ProductWhereInput {
    const typeOfArray = typeOf.split("|") as TypeOf[];

    return {
      typeOf: {
        in: typeOfArray,
      },
    };
  }

  private _getInverterOption(inverter: string): Prisma.ProductWhereInput {
    const inverterBool = inverter === "true";

    return {
      airConditionerStat: {
        is: {
          inverter: inverterBool,
        },
      },
    };
  }

  private _getWiFiOption(wifi: string): Prisma.ProductWhereInput {
    const wifiBool = wifi === "true";

    return {
      airConditionerStat: {
        is: {
          wifi: wifiBool,
        },
      },
    };
  }

  private _getCoolingCapacityOption(
    minCoolingC?: number,
    maxCoolingC?: number
  ): Prisma.ProductWhereInput {
    let coolingOption: Prisma.NestedFloatFilter = {};

    if (minCoolingC !== undefined) {
      coolingOption = { ...coolingOption, gte: minCoolingC };
    }

    if (maxCoolingC !== undefined) {
      coolingOption = { ...coolingOption, lte: maxCoolingC };
    }

    return {
      airConditionerStat: {
        coolingCapacity: Object.keys(coolingOption).length
          ? coolingOption
          : undefined,
      },
    };
  }

  private _getHeatingCapacityOption(
    minHeatingC?: number,
    maxHeatingC?: number
  ): Prisma.ProductWhereInput {
    let heatingOption: Prisma.NestedFloatFilter = {};

    if (minHeatingC !== undefined) {
      heatingOption = { ...heatingOption, gte: minHeatingC };
    }

    if (maxHeatingC !== undefined) {
      heatingOption = { ...heatingOption, lte: maxHeatingC };
    }

    return {
      airConditionerStat: {
        coolingCapacity: Object.keys(heatingOption).length
          ? heatingOption
          : undefined,
      },
    };
  }

  private _getAreaCoverageOption(
    minArea?: number,
    maxArea?: number
  ): Prisma.ProductWhereInput {
    let areaOption: Prisma.NestedIntFilter = {};

    if (minArea !== undefined) {
      areaOption = { ...areaOption, gte: minArea };
    }

    if (maxArea !== undefined) {
      areaOption = { ...areaOption, lte: maxArea };
    }

    return {
      airConditionerStat: {
        is: {
          areaCoverage: Object.keys(areaOption).length ? areaOption : undefined,
        },
      },
    };
  }

  private _getEnergyEfficiencyOption(
    energyEfficiency: string
  ): Prisma.ProductWhereInput {
    const energyArray = energyEfficiency.split("|");

    return {
      airConditionerStat: {
        energyEfficiency: {
          in: energyArray,
        },
      },
    };
  }

  private _getRefrigerantTypeOption(
    refrigerantType: string
  ): Prisma.ProductWhereInput {
    const refrigerantArray = refrigerantType.split("|");

    /* TODO: ВАЖНО, этот метод и его аналоги работают только так - /api/products?refrigerantType=A%2B
        Важно декодировать на фронте, или потом попробую на бэке */
    return {
      airConditionerStat: {
        refrigerantType: {
          in: refrigerantArray,
        },
      },
    };
  }
}
