import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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
import { CreateProductDto } from "src/pagination/dto/product-create.dto";
import { UpdateProductDto } from "src/pagination/dto/update-product.dto";

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
  ) {}

  async findAll(dto: FindAllProductDto = {}) {
    const { perPage, skip } = this.paginationService.getPagination(dto);

    const filters = this.createFilter(dto);

    const products = await this.prisma.product.findMany({
      where: filters,
      include: {
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
          convertToNumber(dto.maxPrice),
        ),
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
          convertToNumber(dto.maxCoolingC),
        ),
      );

    if (dto.minHeatingC || dto.maxHeatingC)
      filters.push(
        getHeatingCapacityOption(
          convertToNumber(dto.minHeatingC),
          convertToNumber(dto.maxHeatingC),
        ),
      );

    if (dto.minArea || dto.maxArea)
      filters.push(
        getAreaCoverageOption(
          convertToNumber(dto.minArea),
          convertToNumber(dto.maxArea),
        ),
      );

    if (dto.energyEfficiency)
      filters.push(getEnergyEfficiencyOption(dto.energyEfficiency));

    if (dto.refrigerantType)
      filters.push(getRefrigerantTypeOption(dto.refrigerantType));

    return filters.length ? { AND: filters } : {};
  }

  // ADMINKA

  async create(dto: CreateProductDto) {
    try {
      // Проверяем уникальность href
      const existingProduct = await this.prisma.product.findUnique({
        where: { href: dto.href },
      });

      if (existingProduct) {
        throw new ConflictException(
          `Товар с href "${dto.href}" уже существует`,
        );
      }

      // Формируем данные для создания
      const data: Prisma.ProductCreateInput = {
        title: dto.title,
        description: dto.description,
        brand: dto.brand,
        serie: dto.serie,
        images: dto.images,
        price: dto.price,
        stock: dto.stock,
        type: dto.type,
        typeOf: dto.typeOf,
        href: dto.href,
        groupId: dto.groupId,
      };

      // Добавляем характеристики в зависимости от типа
      if (dto.type === "AIR_CONDITIONER" && dto.airConditionerStat) {
        data.airConditionerStat = {
          create: dto.airConditionerStat,
        };
      }

      if (dto.type === "FRIDGE_EQUIPMENT" && dto.refrigeratorStat) {
        data.refrigeratorStat = {
          create: dto.refrigeratorStat,
        };
      }

      // Добавляем скидку если есть
      if (dto.discount) {
        data.discount = {
          create: {
            percent: dto.discount.percent,
          },
        };
      }

      // Добавляем документы если есть
      if (dto.documents && dto.documents.length > 0) {
        data.documents = {
          create: dto.documents,
        };
      }

      const product = await this.prisma.product.create({
        data,
        include: {
          airConditionerStat: true,
          refrigeratorStat: true,
          discount: true,
          documents: true,
        },
      });

      return product;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Ошибка создания товара: ${error.message}`);
    }
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        airConditionerStat: true,
        refrigeratorStat: true,
        discount: true,
        documents: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Товар с ID ${id} не найден`);
    }

    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    try {
      // Проверяем существование товара
      await this.findOne(id);

      // Если меняется href, проверяем уникальность
      if (dto.href) {
        const existingProduct = await this.prisma.product.findFirst({
          where: {
            href: dto.href,
            NOT: { id },
          },
        });

        if (existingProduct) {
          throw new ConflictException(
            `Товар с href "${dto.href}" уже существует`,
          );
        }
      }

      // Формируем данные для обновления
      const data: Prisma.ProductUpdateInput = {
        title: dto.title,
        description: dto.description,
        brand: dto.brand,
        serie: dto.serie,
        images: dto.images,
        price: dto.price,
        stock: dto.stock,
        type: dto.type,
        typeOf: dto.typeOf,
        href: dto.href,
        groupId: dto.groupId,
      };

      // Обновляем характеристики кондиционера
      if (dto.type === "AIR_CONDITIONER" && dto.airConditionerStat) {
        const existingStat = await this.prisma.airConditionerStat.findUnique({
          where: { productId: id },
        });

        // Убираем id и productId из данных для update
        const {
          id: _id,
          productId: _productId,
          ...statData
        } = dto.airConditionerStat as any;

        if (existingStat) {
          data.airConditionerStat = {
            update: statData,
          };
        } else {
          data.airConditionerStat = {
            create: statData,
          };
        }

        // Удаляем характеристики холодильника если они есть
        const existingRefrigeratorStat =
          await this.prisma.refrigeratorStat.findUnique({
            where: { productId: id },
          });

        if (existingRefrigeratorStat) {
          await this.prisma.refrigeratorStat.delete({
            where: { productId: id },
          });
        }
      }

      // Обновляем характеристики холодильника
      if (dto.type === "FRIDGE_EQUIPMENT" && dto.refrigeratorStat) {
        const existingStat = await this.prisma.refrigeratorStat.findUnique({
          where: { productId: id },
        });

        // Убираем id и productId из данных для update
        const {
          id: _id,
          productId: _productId,
          ...statData
        } = dto.refrigeratorStat as any;

        if (existingStat) {
          data.refrigeratorStat = {
            update: statData,
          };
        } else {
          data.refrigeratorStat = {
            create: statData,
          };
        }

        // Удаляем характеристики кондиционера если они есть
        const existingAirConditionerStat =
          await this.prisma.airConditionerStat.findUnique({
            where: { productId: id },
          });

        if (existingAirConditionerStat) {
          await this.prisma.airConditionerStat.delete({
            where: { productId: id },
          });
        }
      }

      // Если тип CONSUMABLES, удаляем все характеристики
      if (dto.type === "CONSUMABLES") {
        const existingAirConditionerStat =
          await this.prisma.airConditionerStat.findUnique({
            where: { productId: id },
          });

        if (existingAirConditionerStat) {
          await this.prisma.airConditionerStat.delete({
            where: { productId: id },
          });
        }

        const existingRefrigeratorStat =
          await this.prisma.refrigeratorStat.findUnique({
            where: { productId: id },
          });

        if (existingRefrigeratorStat) {
          await this.prisma.refrigeratorStat.delete({
            where: { productId: id },
          });
        }
      }

      // Обновляем скидку
      if (dto.discount !== undefined) {
        const existingDiscount = await this.prisma.discount.findUnique({
          where: { productId: id },
        });

        if (dto.discount === null) {
          // Удаляем скидку
          if (existingDiscount) {
            await this.prisma.discount.delete({
              where: { productId: id },
            });
          }
        } else {
          // Создаём или обновляем скидку
          if (existingDiscount) {
            data.discount = {
              update: { percent: dto.discount.percent },
            };
          } else {
            data.discount = {
              create: { percent: dto.discount.percent },
            };
          }
        }
      }

      // Обновляем документы
      if (dto.documents !== undefined) {
        // Удаляем старые документы
        await this.prisma.documents.deleteMany({
          where: { productId: id },
        });

        // Создаём новые документы
        if (dto.documents.length > 0) {
          data.documents = {
            create: dto.documents,
          };
        }
      }

      const product = await this.prisma.product.update({
        where: { id },
        data,
        include: {
          airConditionerStat: true,
          refrigeratorStat: true,
          discount: true,
          documents: true,
        },
      });

      return product;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new Error(`Ошибка обновления товара: ${error.message}`);
    }
  }

  async delete(id: number) {
    try {
      // Проверяем существование товара
      await this.findOne(id);

      await this.prisma.product.delete({
        where: { id },
      });

      return { message: `Товар с ID ${id} успешно удален` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Ошибка удаления товара: ${error.message}`);
    }
  }

  async findAllForAdmin() {
    const products = await this.prisma.product.findMany({
      include: {
        discount: true,
        documents: true,
        airConditionerStat: true,
        refrigeratorStat: true,
      },
      orderBy: { id: "desc" },
    });

    return {
      products,
      length: products.length,
    };
  }
}
