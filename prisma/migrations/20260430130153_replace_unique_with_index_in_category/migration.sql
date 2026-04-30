-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Category_type_key";

-- DropIndex
DROP INDEX "Category_userId_key";

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Category_type_idx" ON "Category"("type");
