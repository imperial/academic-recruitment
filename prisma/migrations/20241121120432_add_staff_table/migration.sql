-- CreateEnum
CREATE TYPE "role" AS ENUM ('PANEL', 'MANAGER', 'ACADEMIC');

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" "role" NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_email_key" ON "staff"("email");
