/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `usuario_cpf_idReceber_email_key` ON `usuario`;

-- CreateIndex
CREATE UNIQUE INDEX `usuario_cpf_key` ON `usuario`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `usuario_email_key` ON `usuario`(`email`);
