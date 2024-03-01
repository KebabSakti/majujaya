/*
  Warnings:

  - You are about to drop the column `email` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Admin_email_key` ON `admin`;

-- DropIndex
DROP INDEX `Admin_email_name_phone_idx` ON `admin`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `email`,
    DROP COLUMN `phone`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_username_key` ON `Admin`(`username`);

-- CreateIndex
CREATE INDEX `Admin_username_name_idx` ON `Admin`(`username`, `name`);
