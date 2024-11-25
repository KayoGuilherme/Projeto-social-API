-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('ROUPAS', 'BRINQUEDOS', 'ACESSORIOS', 'ALIMENTOS', 'OUTROS');

-- CreateEnum
CREATE TYPE "StatusDoacao" AS ENUM ('AGUARDANDO', 'ENTREGUE', 'CANCELADA');

-- CreateTable
CREATE TABLE "Doador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "isCompany" BOOLEAN NOT NULL,
    "CPF" TEXT NOT NULL,
    "cnpj" TEXT,
    "isAnonymous" BOOLEAN,
    "role" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doacao" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "status" "StatusDoacao" NOT NULL DEFAULT 'AGUARDANDO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "doadorId" INTEGER NOT NULL,

    CONSTRAINT "Doacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contato_Doador" (
    "id" SERIAL NOT NULL,
    "url" TEXT,
    "tell_contato" TEXT NOT NULL,
    "doadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contato_Doador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdressDoador" (
    "id" SERIAL NOT NULL,
    "CEP" TEXT NOT NULL,
    "numero" TEXT,
    "complemento" TEXT NOT NULL,
    "ponto_de_referencia" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "telefone_contato" TEXT NOT NULL,
    "Rua" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AdressDoador_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contato_Doador" ADD CONSTRAINT "Contato_Doador_doadorId_fkey" FOREIGN KEY ("doadorId") REFERENCES "Doador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdressDoador" ADD CONSTRAINT "AdressDoador_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Doador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
