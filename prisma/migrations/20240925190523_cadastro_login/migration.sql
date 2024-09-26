/*
  Warnings:

  - You are about to drop the column `unit_type` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `supplier` table. All the data in the column will be lost.
  - You are about to drop the `productstatistic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unit_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `category_id` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `supplier_id` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `productstatistic` DROP FOREIGN KEY `ProductStatistic_product_id_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `unit_type`,
    ADD COLUMN `unit_id` INTEGER NOT NULL,
    MODIFY `category_id` INTEGER NOT NULL,
    MODIFY `supplier_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `rating`;

-- DropTable
DROP TABLE `productstatistic`;

-- CreateTable
CREATE TABLE `ProductUnit` (
    `unit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit_type` ENUM('un', 'kg', 'lt') NOT NULL,

    PRIMARY KEY (`unit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `table_name` VARCHAR(191) NOT NULL,
    `record_id` INTEGER NOT NULL,
    `old_value` VARCHAR(191) NULL,
    `new_value` VARCHAR(191) NULL,
    `action_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductStatistics` (
    `stat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `total_sales` INTEGER NOT NULL DEFAULT 0,
    `stock_level` INTEGER NOT NULL DEFAULT 0,
    `average_daily_sales` DOUBLE NOT NULL DEFAULT 0.0,
    `last_movement_date` DATETIME(3) NULL,

    PRIMARY KEY (`stat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `Supplier`(`supplier_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `ProductUnit`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStatistics` ADD CONSTRAINT `ProductStatistics_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
