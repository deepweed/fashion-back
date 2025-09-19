/* commonFilters - общие фильтры. Например цена, поиск и тд и тп */

import { Prisma, Stock } from "@prisma/client";
import { EProductPriceSort } from "../dto/findAll.dto";

export function getSortOption(
  sort: EProductPriceSort
): Prisma.ProductOrderByWithRelationInput[] {
  switch (sort) {
    case EProductPriceSort.HIGH_PRICE:
      return [{ price: "desc" }];
    default:
      return [{ price: "asc" }];

    /* TODO: в дальнейшем добавить кейсы с рейтингом */
  }
}

export function getSearchOption(search: string): Prisma.ProductWhereInput {
  return {
    OR: [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      /* Поиск по бренду не нужен, бренд всегда содержится в названии товара */
      {
        serie: {
          contains: search,
          mode: "insensitive",
        },
      },
    ],
  };
}

export function getSerieOption(serie: string): Prisma.ProductWhereInput {
  const serieArray = serie.split("|");

  return {
    serie: {
      in: serieArray,
    },
  };
}

export function getPriceOption(
  minPrice?: number,
  maxPrice?: number
): Prisma.ProductWhereInput {
  let priceOption: Prisma.NestedFloatFilter = {};

  if (minPrice !== undefined) {
    priceOption = { ...priceOption, gte: minPrice };
  }

  if (maxPrice !== undefined) {
    priceOption = { ...priceOption, lte: maxPrice };
  }

  return {
    price: Object.keys(priceOption).length ? priceOption : undefined,
  };
}

export function getStockOption(stock: string): Prisma.ProductWhereInput {
  const stockArray = stock.split("|") as Stock[];

  return {
    stock: {
      in: stockArray,
    },
  };
}
