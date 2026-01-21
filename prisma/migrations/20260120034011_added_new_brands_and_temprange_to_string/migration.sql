/*
  Warnings:

  - A unique constraint covering the columns `[href]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."Brands" ADD VALUE 'LORIOT';
ALTER TYPE "public"."Brands" ADD VALUE 'LANKORA';
ALTER TYPE "public"."Brands" ADD VALUE 'VITELLI';

-- AlterTable
ALTER TABLE "public"."refrigerator_stat" ALTER COLUMN "temp_range" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "product_href_key" ON "public"."product"("href");
