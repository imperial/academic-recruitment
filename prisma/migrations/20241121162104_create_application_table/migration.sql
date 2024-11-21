-- CreateEnum
CREATE TYPE "stage" AS ENUM ('NEW_APPLICATION', 'FOR_CONSIDERATION', 'SHORTLISTED', 'INTERVIEW_ARRANGED', 'INTERVIEW_COMPLETE', 'DECISION_MADE', 'CANDIDATE_INFORMED');

-- CreateEnum
CREATE TYPE "decision" AS ENUM ('PENDING', 'HIRE', 'DEFER', 'REJECT');

-- CreateTable
CREATE TABLE "application" (
    "id" SERIAL NOT NULL,
    "round" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "reference_number" TEXT NOT NULL,
    "edi" BOOLEAN NOT NULL,
    "stage" "stage" NOT NULL,
    "decision" "decision" NOT NULL,

    CONSTRAINT "application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "application_reference_number_key" ON "application"("reference_number");
