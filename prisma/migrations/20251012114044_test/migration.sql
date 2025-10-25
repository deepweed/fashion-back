-- CreateEnum
CREATE TYPE "public"."Brands" AS ENUM ('BALLU', 'ISHIMATSU', 'MITSUBISHI_ELECTRIC', 'HISENSE', 'SHUFT', 'BIRYUSA', 'TCL', 'DAHACI', 'BELLUNA');

-- CreateEnum
CREATE TYPE "public"."Stock" AS ENUM ('IN_STOCK', 'PRE_ORDER', 'OUT_OF_STOCK');

-- CreateEnum
CREATE TYPE "public"."Type" AS ENUM ('AIR_CONDITIONER', 'FRIDGE_EQUIPMENT', 'CONSUMABLES');

-- CreateEnum
CREATE TYPE "public"."TypeOf" AS ENUM ('WALL_MOUNTED_AIR', 'CASSETE_CONDITIONER', 'DUCTED_CONDITIONER', 'WALL_CEILING_CONDITIONER');

-- CreateTable
CREATE TABLE "public"."product" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "brand" "public"."Brands" NOT NULL,
    "serie" VARCHAR(45) NOT NULL,
    "images" TEXT[],
    "price" DOUBLE PRECISION NOT NULL,
    "stock" "public"."Stock" NOT NULL,
    "type" "public"."Type" NOT NULL,
    "type_of" "public"."TypeOf",
    "href" VARCHAR(155) NOT NULL,
    "group_id" VARCHAR(100) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."air_conditioner_stat" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "cooling_capacity" DOUBLE PRECISION,
    "heating_capacity" DOUBLE PRECISION,
    "area_coverage" INTEGER,
    "energy_efficiency" TEXT,
    "noise_level_indoor" INTEGER,
    "noise_level_outdoor" INTEGER,
    "power_consumption" DOUBLE PRECISION,
    "refrigerant_type" TEXT,
    "dimensions_indoor" TEXT,
    "dimensions_outdoor" TEXT,
    "weight_indoor" DOUBLE PRECISION,
    "weight_outdoor" DOUBLE PRECISION,
    "inverter" BOOLEAN NOT NULL,
    "wifi" BOOLEAN NOT NULL,

    CONSTRAINT "air_conditioner_stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."refrigerator_stat" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "temp_range" INTEGER,
    "cooling_capacity" DOUBLE PRECISION,
    "refrigerant_type" TEXT,
    "refrigerant_mass" DOUBLE PRECISION,
    "installation_type" TEXT,
    "power_max" DOUBLE PRECISION,
    "compressor_type" TEXT,
    "voltage" INTEGER,
    "chamber_volume_m10" INTEGER,
    "chamber_volume_m20" INTEGER,
    "defrost_type" TEXT,
    "dimensions_outdoor" TEXT,
    "weight_outdoor" DOUBLE PRECISION,
    "dimensions_indoor" TEXT,
    "weight_indoor" DOUBLE PRECISION,

    CONSTRAINT "refrigerator_stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Discount" (
    "id" SERIAL NOT NULL,
    "percent" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Documents" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "air_conditioner_stat_product_id_key" ON "public"."air_conditioner_stat"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "refrigerator_stat_product_id_key" ON "public"."refrigerator_stat"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Discount_product_id_key" ON "public"."Discount"("product_id");

-- AddForeignKey
ALTER TABLE "public"."air_conditioner_stat" ADD CONSTRAINT "air_conditioner_stat_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."refrigerator_stat" ADD CONSTRAINT "refrigerator_stat_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Discount" ADD CONSTRAINT "Discount_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Documents" ADD CONSTRAINT "Documents_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
