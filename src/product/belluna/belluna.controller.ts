import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { BellunaService } from "./belluna.service";
import { FindBellunaProductDto } from "../dto/findBelluna.dto";

@Controller("products/belluna")
export class BellunaController {
  constructor(private readonly bellunaService: BellunaService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async findBelluna(@Query() query: FindBellunaProductDto) {
    return this.bellunaService.findBelluna(query);
  }
}
