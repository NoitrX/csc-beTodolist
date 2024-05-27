/*
  Warnings:

  - You are about to alter the column `createdBy` on the `todolist` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `updatedBy` on the `todolist` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `todolist` ADD COLUMN `status` ENUM('COMPLETED', 'ON_PROGRESS', 'PENDING') NOT NULL DEFAULT 'PENDING',
    MODIFY `createdBy` INTEGER NOT NULL,
    MODIFY `updatedBy` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Todolist` ADD CONSTRAINT `Todolist_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Todolist` ADD CONSTRAINT `Todolist_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
