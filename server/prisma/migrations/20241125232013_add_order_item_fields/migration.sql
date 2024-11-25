/*
  Warnings:

  - Added the required column `product_cover_image` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_discount` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_price` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "product_cover_image" TEXT NOT NULL,
ADD COLUMN     "product_discount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "product_name" TEXT NOT NULL,
ADD COLUMN     "product_price" DECIMAL(65,30) NOT NULL;
