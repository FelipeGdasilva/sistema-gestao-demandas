-- CreateTable
CREATE TABLE "demandas" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_solicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "setor" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "prioridade" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demandas_pkey" PRIMARY KEY ("id")
);
