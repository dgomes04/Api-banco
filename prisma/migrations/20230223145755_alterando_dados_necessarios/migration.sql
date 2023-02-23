/*
  Warnings:

  - You are about to drop the column `emailDestino` on the `transacao` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioCpf` on the `transacao` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioDestino` on the `transacao` table. All the data in the column will be lost.
  - The required column `idDestino` was added to the `transacao` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `idUser` to the `transacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transacao` DROP FOREIGN KEY `transacao_usuarioCpf_usuarioDestino_emailDestino_fkey`;

-- DropIndex
DROP INDEX `usuario_cpf_key` ON `usuario`;

-- DropIndex
DROP INDEX `usuario_email_key` ON `usuario`;

-- AlterTable
ALTER TABLE `transacao` DROP COLUMN `emailDestino`,
    DROP COLUMN `usuarioCpf`,
    DROP COLUMN `usuarioDestino`,
    ADD COLUMN `idDestino` VARCHAR(191) NOT NULL,
    ADD COLUMN `idUser` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `transacao` ADD CONSTRAINT `transacao_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
