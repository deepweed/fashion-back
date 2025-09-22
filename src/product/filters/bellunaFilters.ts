import { Prisma } from "@prisma/client";

export function getBTempRangeOption(
  minTempRange?: number,
  maxTempRange?: number
): Prisma.ProductWhereInput {
  let tempOption: Prisma.NestedFloatFilter = {};

  if (minTempRange !== undefined) {
    tempOption = { ...tempOption, gte: minTempRange };
  }

  if (maxTempRange !== undefined) {
    tempOption = { ...tempOption, lte: maxTempRange };
  }

  return {
    refrigeratorStat: {
      tempRange: Object.keys(tempOption).length ? tempOption : undefined,
    },
  };
}

export function getBRefrigerantType(
  refrigerant: string
): Prisma.ProductWhereInput {
  const refrigerantArray = refrigerant.split("|");

  return {
    refrigeratorStat: {
      refrigerantType: {
        in: refrigerantArray,
      },
    },
  };
}

export function getBCompressorType(
  compressorType: string
): Prisma.ProductWhereInput {
  const compressorArray = compressorType.split("|");

  return {
    refrigeratorStat: {
      compressorType: {
        in: compressorArray,
      },
    },
  };
}
