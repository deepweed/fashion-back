import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { BellunaService } from "./belluna.service";
import { FindAllProductDto } from "../dto/findAll.dto";

@Controller("products/belluna")
export class BellunaController {
  constructor(private readonly bellunaService: BellunaService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async findAll(@Query() query: FindAllProductDto) {
    return this.bellunaService.findBelluna(query);
  }
}
