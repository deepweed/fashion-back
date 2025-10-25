import { IsOptional, IsString } from "class-validator";

export class PhoneCallDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  theme: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsString()
  agreeData: string;
}
