/*
  Warnings:

  - You are about to drop the `coupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock_entry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `zipcode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_id_order_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_id_product_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_code_fkey";

-- DropForeignKey
ALTER TABLE "stock_entry" DROP CONSTRAINT "stock_entry_id_product_fkey";

-- DropTable
DROP TABLE "coupon";

-- DropTable
DROP TABLE "item";

-- DropTable
DROP TABLE "order";

-- DropTable
DROP TABLE "product";

-- DropTable
DROP TABLE "stock_entry";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "zipcode";

-- CreateTable
CREATE TABLE "Product" (
    "idProduct" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("idProduct")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "code" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Order" (
    "idOrder" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "freight" DOUBLE PRECISION NOT NULL,
    "sequence" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("idOrder")
);

-- CreateTable
CREATE TABLE "Item" (
    "idOrder" TEXT NOT NULL,
    "idProduct" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("idOrder")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "passwordType" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Zipcode" (
    "code" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Zipcode_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "StockEntry" (
    "idProduct" INTEGER NOT NULL,
    "operation" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "StockEntry_pkey" PRIMARY KEY ("idProduct")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_code_fkey" FOREIGN KEY ("code") REFERENCES "Coupon"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_idOrder_fkey" FOREIGN KEY ("idOrder") REFERENCES "Order"("idOrder") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("idProduct") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockEntry" ADD CONSTRAINT "StockEntry_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("idProduct") ON DELETE RESTRICT ON UPDATE CASCADE;
