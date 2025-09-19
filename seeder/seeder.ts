import { PrismaClient } from "@prisma/client";
import { PRODUCTS } from "./product.data";

const prisma = new PrismaClient();

async function main() {
  console.log("Начинаем..");

  try {
    const res = await prisma.product.createMany({ data: PRODUCTS });
    console.log("Тестовые товары успешно добавлены в БД");
  } catch (e) {
    console.log("Произошла ошибка: ", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("Соединение с Prisma разорвано");
  }
}

main();
