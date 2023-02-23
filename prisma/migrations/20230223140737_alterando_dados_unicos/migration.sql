-- CreateTable
CREATE TABLE `usuario` (
    `id` VARCHAR(191) NOT NULL,
    `idReceber` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `numero_conta` VARCHAR(191) NOT NULL,
    `agencia` VARCHAR(191) NOT NULL,
    `saldo` DECIMAL(65, 30) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `usuario_id_key`(`id`),
    UNIQUE INDEX `usuario_idReceber_key`(`idReceber`),
    UNIQUE INDEX `usuario_cpf_key`(`cpf`),
    UNIQUE INDEX `usuario_email_key`(`email`),
    UNIQUE INDEX `usuario_cpf_idReceber_email_key`(`cpf`, `idReceber`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transacao` (
    `id` VARCHAR(191) NOT NULL,
    `valorTransferido` DECIMAL(65, 30) NOT NULL,
    `emailDestino` VARCHAR(191) NOT NULL,
    `usuarioCpf` VARCHAR(191) NOT NULL,
    `usuarioDestino` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `transacao_id_key`(`id`),
    UNIQUE INDEX `transacao_id_usuarioDestino_usuarioCpf_key`(`id`, `usuarioDestino`, `usuarioCpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transacao` ADD CONSTRAINT `transacao_usuarioCpf_usuarioDestino_emailDestino_fkey` FOREIGN KEY (`usuarioCpf`, `usuarioDestino`, `emailDestino`) REFERENCES `usuario`(`cpf`, `idReceber`, `email`) ON DELETE RESTRICT ON UPDATE CASCADE;
