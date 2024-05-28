/*
  Warnings:

  - You are about to drop the column `userId` on the `todolist_attachment` table. All the data in the column will be lost.
  - You are about to alter the column `createdBy` on the `todolist_attachment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `updatedBy` on the `todolist_attachment` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `todolist_attachment` DROP FOREIGN KEY `TodoList_attachment_userId_fkey`;

-- AlterTable
ALTER TABLE `todolist_attachment` DROP COLUMN `userId`,
    MODIFY `file` VARCHAR(191) NULL,
    MODIFY `createdBy` INTEGER NOT NULL,
    MODIFY `updatedBy` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `TodoList_attachment` ADD CONSTRAINT `TodoList_attachment_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TodoList_attachment` ADD CONSTRAINT `TodoList_attachment_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
