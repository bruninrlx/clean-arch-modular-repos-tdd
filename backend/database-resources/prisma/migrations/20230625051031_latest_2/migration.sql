/*
  Warnings:

  - The primary key for the `StockEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "StockEntry" DROP CONSTRAINT "StockEntry_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "StockEntry_pkey" PRIMARY KEY ("id");
