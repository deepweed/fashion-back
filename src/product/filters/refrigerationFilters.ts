import { Prisma } from "@prisma/client";

export function getCompressorTypeOption(
  compressorType?: string,
): Prisma.ProductWhereInput | {} {
  if (!compressorType) {
    return {};
  }

  if (compressorType === "inverter") {
    return {
      refrigeratorStat: {
        compressorType: "inverter",
      },
    };
  }

  if (compressorType === "on-off") {
    return {
      refrigeratorStat: {
        compressorType: "on-off",
      },
    };
  }

  return {};
}

export function getPowerMaxOption(
  minPowerMax?: number,
  maxPowerMax?: number,
): Prisma.ProductWhereInput {
  let powerMax: Prisma.NestedFloatFilter = {};

  if (minPowerMax !== undefined) {
    powerMax = { ...powerMax, gte: minPowerMax };
  }

  if (maxPowerMax !== undefined) {
    powerMax = { ...powerMax, lte: maxPowerMax };
  }

  return {
    refrigeratorStat: {
      powerMax: Object.keys(powerMax).length ? powerMax : undefined,
    },
  };
}

export function getCoolingCapacityOption(
  minCooling?: number,
  maxCooling?: number,
): Prisma.ProductWhereInput {
  let coolingCapacity: Prisma.NestedFloatFilter = {};

  if (minCooling !== undefined) {
    coolingCapacity = { ...coolingCapacity, gte: minCooling };
  }

  if (maxCooling !== undefined) {
    coolingCapacity = { ...coolingCapacity, lte: maxCooling };
  }

  return {
    refrigeratorStat: {
      coolingCapacity: Object.keys(coolingCapacity).length
        ? coolingCapacity
        : undefined,
    },
  };
}

// TODO: THEN DO FRONT
