-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PANEL', 'MANAGER', 'ACADEMIC');

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staff_email_key" ON "staff"("email");
