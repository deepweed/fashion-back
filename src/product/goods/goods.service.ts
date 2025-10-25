import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GoodsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByHref(href: string) {
    const product = await this.prisma.product.findUnique({
      where: { href },
      select: { id: true, type: true, groupId: true },
    });

    if (!product) return null;

    const statsInclude =
      product.type === "FRIDGE_EQUIPMENT"
        ? { refrigeratorStat: true }
        : { airConditionerStat: true };

    const relatedProducts = await this.prisma.product.findMany({
      where: { groupId: product.groupId, href: { not: href } },
      select: { title: true, href: true },
    });

    const mainProduct = await this.prisma.product.findUnique({
      where: { href },
      include: {
        ...statsInclude,
        discount: true,
        documents: true,
      },
    });

    return {
      product: mainProduct,
      relatedProducts,
    };
  }
}
