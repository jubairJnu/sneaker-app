-- DropIndex
DROP INDEX "reservations_userId_productId_status_key";

-- CreateIndex
CREATE INDEX "reservations_userId_productId_status_idx" ON "reservations"("userId", "productId", "status");
