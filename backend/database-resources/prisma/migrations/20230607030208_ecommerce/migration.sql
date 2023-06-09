/*
  Warnings:

  - You are about to drop the column `expireDate` on the `Coupon` table. All the data in the column will be lost.
  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idOrder` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `idProduct` on the `Item` table. All the data in the column will be lost.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idOrder` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idProduct` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `StockEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idProduct` on the `StockEntry` table. All the data in the column will be lost.
  - You are about to drop the column `passwordType` on the `User` table. All the data in the column will be lost.
  - Added the required column `expire_date` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_order` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_product` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_order` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_product` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_product` to the `StockEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_idOrder_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "StockEntry" DROP CONSTRAINT "StockEntry_idProduct_fkey";

-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "expireDate",
ADD COLUMN     "expire_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "idOrder",
DROP COLUMN "idProduct",
ADD COLUMN     "id_order" TEXT NOT NULL,
ADD COLUMN     "id_product" INTEGER NOT NULL,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("id_order");

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "idOrder",
ADD COLUMN     "id_order" TEXT NOT NULL,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id_order");

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "idProduct",
ADD COLUMN     "id_product" INTEGER NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id_product");

-- AlterTable
ALTER TABLE "StockEntry" DROP CONSTRAINT "StockEntry_pkey",
DROP COLUMN "idProduct",
ADD COLUMN     "id_product" INTEGER NOT NULL,
ADD CONSTRAINT "StockEntry_pkey" PRIMARY KEY ("id_product");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordType",
ADD COLUMN     "password_type" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockEntry" ADD CONSTRAINT "StockEntry_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;
