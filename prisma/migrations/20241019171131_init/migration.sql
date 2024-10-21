/*
  Warnings:

  - The values [entrada,saida] on the enum `StockMovement_movement_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `stockmovement` ADD COLUMN `category_id` INTEGER NULL,
    ADD COLUMN `product_id` INTEGER NULL,
    MODIFY `movement_type` ENUM('compra', 'venda') NOT NULL;

-- AddForeignKey
ALTER TABLE `StockMovement` ADD CONSTRAINT `StockMovement_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockMovement` ADD CONSTRAINT `StockMovement_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE SET NULL ON UPDATE CASCADE;
