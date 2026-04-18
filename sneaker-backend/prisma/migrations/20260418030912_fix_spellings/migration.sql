/*
  Warnings:

  - You are about to drop the column `expiresAT` on the `reservations` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "expiresAT",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
