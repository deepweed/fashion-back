import { Brands, Prisma, TypeOf } from "@prisma/client";

export function getBrandOption(brands: string): Prisma.ProductWhereInput {
  const brandArray = brands.split("|") as Brands[];

  return {
    brand: {
      in: brandArray,
    },
  };
}

export function getTypeOfOption(typeOf: string): Prisma.ProductWhereInput {
  const typeOfArray = typeOf.split("|") as TypeOf[];

  return {
    typeOf: {
      in: typeOfArray,
    },
  };
}

export function getInverterOption(inverter: string): Prisma.ProductWhereInput {
  const inverterBool = inverter === "true";

  return {
    airConditionerStat: {
      is: {
        inverter: inverterBool,
      },
    },
  };
}

export function getWiFiOption(wifi: string): Prisma.ProductWhereInput {
  const wifiBool = wifi === "true";

  return {
    airConditionerStat: {
      is: {
        wifi: wifiBool,
      },
    },
  };
}

export function getCoolingCapacityOption(
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

export function getHeatingCapacityOption(
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

export function getAreaCoverageOption(
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

export function getEnergyEfficiencyOption(
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

export function getRefrigerantTypeOption(
  refrigerantType: string
): Prisma.ProductWhereInput {
  const refrigerantArray = refrigerantType.split("|");

  return {
    airConditionerStat: {
      refrigerantType: {
        in: refrigerantArray,
      },
    },
  };
}
