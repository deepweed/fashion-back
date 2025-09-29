import { Brands, Stock, TypeOf } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/pagination/dto/pagination.dto";

export enum EProductPriceSort {
  LOW_PRICE = "LOW_PRICE",
  HIGH_PRICE = "HIGH_PRICE",
}

export class FindAllProductDto extends PaginationDto {
  @IsOptional()
  @IsEnum(EProductPriceSort)
  sort?: EProductPriceSort;

  @IsOptional()
  @IsString()
  search?: string; // Поиск по title, brand and serie

  @IsOptional()
  @IsString()
  brands?: string;

  @IsOptional()
  @IsString()
  serie?: string;

  @IsOptional()
  @IsString()
  minPrice?: string;

  @IsOptional()
  @IsString()
  maxPrice?: string;

  @IsOptional()
  @IsString()
  stock?: string;

  @IsOptional()
  @IsString()
  typeOf?: string;

  @IsOptional()
  @IsString()
  inverter?: string;

  @IsOptional()
  @IsString()
  wifi?: string;

  @IsOptional()
  @IsString()
  minCoolingC?: string;

  @IsOptional()
  @IsString()
  maxCoolingC?: string;

  @IsOptional()
  @IsString()
  minHeatingC?: string;

  @IsOptional()
  @IsString()
  maxHeatingC?: string;

  @IsOptional()
  @IsString()
  minArea?: string;

  @IsOptional()
  @IsString()
  maxArea?: string;

  @IsOptional()
  @IsString()
  energyEfficiency?: string;

  @IsOptional()
  @IsString()
  noiseLevelIndoor?: string;

  @IsOptional()
  @IsString()
  noiseLevelOutdoor?: string;

  @IsOptional()
  @IsString()
  powerConsumption?: string;

  @IsOptional()
  @IsString()
  refrigerantType?: string;

  @IsOptional()
  @IsString()
  dimensionsIndoor?: string;

  /* Belluna DTO, TODO: вынести в другое место */

  @IsOptional()
  @IsString()
  minTempRange?: string;

  @IsOptional()
  @IsString()
  maxTempRange?: string;

  @IsOptional()
  @IsString()
  refrigerant?: string;

  @IsOptional()
  @IsString()
  compressorType?: string;
}
