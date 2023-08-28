-- CreateTable
CREATE TABLE "product" (
    "id_product" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id_product")
);

-- CreateTable
CREATE TABLE "coupon" (
    "code" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "expire_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "order" (
    "id_order" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "freight" DOUBLE PRECISION NOT NULL,
    "sequence" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id_order")
);

-- CreateTable
CREATE TABLE "item" (
    "id_order" TEXT NOT NULL,
    "id_product" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id_order")
);

-- CreateTable
CREATE TABLE "user" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "password_type" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "zipcode" (
    "code" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "zipcode_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "stock_entry" (
    "id_product" INTEGER NOT NULL,
    "operation" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "stock_entry_pkey" PRIMARY KEY ("id_product")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_code_fkey" FOREIGN KEY ("code") REFERENCES "coupon"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "order"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_entry" ADD CONSTRAINT "stock_entry_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "product"("id_product") ON DELETE RESTRICT ON UPDATE CASCADE;
