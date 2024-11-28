/*
  Warnings:

  - You are about to drop the column `product_cover_image` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `product_discount` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `product_name` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "product_cover_image",
DROP COLUMN "product_discount",
DROP COLUMN "product_name";
