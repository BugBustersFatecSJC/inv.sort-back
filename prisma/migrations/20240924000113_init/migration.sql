/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('admin', 'gerente', 'funcionario') NOT NULL,
    ADD COLUMN `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
    ADD COLUMN `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- CreateTable
CREATE TABLE `Category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_category_name_key`(`category_name`),
    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `supplier_id` INTEGER NOT NULL AUTO_INCREMENT,
    `supplier_name` VARCHAR(191) NOT NULL,
    `contact_info` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `rating` DOUBLE NOT NULL,

    UNIQUE INDEX `Supplier_supplier_name_key`(`supplier_name`),
    PRIMARY KEY (`supplier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `category_id` INTEGER NULL,
    `supplier_id` INTEGER NULL,
    `is_perishable` BOOLEAN NOT NULL DEFAULT false,
    `unit_type` ENUM('un', 'kg', 'lt') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Batch` (
    `batch_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `expiration_date` DATETIME(3) NULL,
    `manufacture_date` DATETIME(3) NULL,
    `entry_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `exit_date` DATETIME(3) NULL,

    PRIMARY KEY (`batch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockMovement` (
    `movement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `batch_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `movement_type` ENUM('entrada', 'saida') NOT NULL,
    `movement_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`movement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductStatistic` (
    `stat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `total_sales` INTEGER NOT NULL DEFAULT 0,
    `stock_level` INTEGER NOT NULL DEFAULT 0,
    `average_daily_sales` DOUBLE NOT NULL DEFAULT 0.0,
    `last_movement_date` DATETIME(3) NULL,

    PRIMARY KEY (`stat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `Supplier`(`supplier_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Batch` ADD CONSTRAINT `Batch_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockMovement` ADD CONSTRAINT `StockMovement_batch_id_fkey` FOREIGN KEY (`batch_id`) REFERENCES `Batch`(`batch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockMovement` ADD CONSTRAINT `StockMovement_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStatistic` ADD CONSTRAINT `ProductStatistic_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
