import { PaginationDto } from "src/pagination/dto/pagination.dto";
import { EProductPriceSort } from "./findAll.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class FindBellunaProductDto extends PaginationDto {
  @IsOptional()
  @IsEnum(EProductPriceSort)
  sort?: EProductPriceSort;

  @IsOptional()
  @IsString()
  search?: string;

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
  compressorType?: string; // inverter or ON/OFF

  @IsOptional()
  @IsString()
  minPowerMax?: string; // энергопотребление (кВт)

  @IsOptional()
  @IsString()
  maxPowerMax?: string;

  @IsOptional()
  @IsString()
  minTemp?: string; // Диапазон температур (например: "-25...+22 °C")

  @IsOptional()
  @IsString()
  maxTemp?: string;

  @IsOptional()
  @IsString()
  minCooling?: string; // coolingCapacity

  @IsOptional()
  @IsString()
  maxCooling?: string;
}
