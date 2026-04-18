/*
  Warnings:

  - Added the required column `amount` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
