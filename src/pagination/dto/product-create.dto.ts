import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsArray,
  IsBoolean,
  ValidateNested,
  IsInt,
  Min,
  Max,
} from "class-validator";
import { Type } from "class-transformer";
import { Brands, Stock, Type as ProductType, TypeOf } from "@prisma/client";

class AirConditionerStatDto {
  @IsOptional()
  @IsNumber()
  coolingCapacity?: number;

  @IsOptional()
  @IsNumber()
  heatingCapacity?: number;

  @IsOptional()
  @IsInt()
  areaCoverage?: number;

  @IsOptional()
  @IsString()
  energyEfficiency?: string;

  @IsOptional()
  @IsInt()
  noiseLevelIndoor?: number;

  @IsOptional()
  @IsInt()
  noiseLevelOutdoor?: number;

  @IsOptional()
  @IsNumber()
  powerConsumption?: number;

  @IsOptional()
  @IsString()
  refrigerantType?: string;

  @IsOptional()
  @IsString()
  dimensionsIndoor?: string;

  @IsOptional()
  @IsString()
  dimensionsOutdoor?: string;

  @IsOptional()
  @IsNumber()
  weightIndoor?: number;

  @IsOptional()
  @IsNumber()
  weightOutdoor?: number;

  @IsBoolean()
  inverter: boolean;

  @IsBoolean()
  wifi: boolean;
}

class RefrigeratorStatDto {
  @IsOptional()
  @IsString()
  tempRange?: string;

  @IsOptional()
  @IsNumber()
  coolingCapacity?: number;

  @IsOptional()
  @IsString()
  refrigerantType?: string;

  @IsOptional()
  @IsNumber()
  refrigerantMass?: number;

  @IsOptional()
  @IsString()
  installationType?: string;

  @IsOptional()
  @IsNumber()
  powerMax?: number;

  @IsOptional()
  @IsString()
  compressorType?: string;

  @IsOptional()
  @IsInt()
  voltage?: number;

  @IsOptional()
  @IsInt()
  chamberVolumeM10?: number;

  @IsOptional()
  @IsInt()
  chamberVolumeM20?: number;

  @IsOptional()
  @IsString()
  defrostType?: string;

  @IsOptional()
  @IsString()
  dimensionsOutdoor?: string;

  @IsOptional()
  @IsNumber()
  weightOutdoor?: number;

  @IsOptional()
  @IsString()
  dimensionsIndoor?: string;

  @IsOptional()
  @IsNumber()
  weightIndoor?: number;
}

class DiscountDto {
  @IsInt()
  @Min(0)
  @Max(100)
  percent: number;
}

class DocumentDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsInt()
  productId?: number;

  @IsString()
  title: string;

  @IsString()
  url: string;
}

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Brands)
  brand: Brands;

  @IsString()
  serie: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNumber()
  price: number;

  @IsEnum(Stock)
  stock: Stock;

  @IsEnum(ProductType)
  type: ProductType;

  @IsOptional()
  @IsEnum(TypeOf)
  typeOf?: TypeOf;

  @IsString()
  href: string;

  @IsString()
  groupId: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AirConditionerStatDto)
  airConditionerStat?: AirConditionerStatDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RefrigeratorStatDto)
  refrigeratorStat?: RefrigeratorStatDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DiscountDto)
  discount?: DiscountDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents?: DocumentDto[];
}
