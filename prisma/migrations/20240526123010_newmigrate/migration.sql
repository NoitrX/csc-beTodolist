-- DropForeignKey
ALTER TABLE `todolist` DROP FOREIGN KEY `Todolist_updatedBy_fkey`;

-- AlterTable
ALTER TABLE `todolist` MODIFY `updatedBy` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Todolist` ADD CONSTRAINT `Todolist_updatedBy_fkey` FOREIGN KEY (`updatedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
