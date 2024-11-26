-- CreateEnum
CREATE TYPE "rating" AS ENUM ('YES', 'MAYBE', 'NO');

-- CreateEnum
CREATE TYPE "comment_type" AS ENUM ('GENERAL', 'FOLLOWING_TALK', 'INDIVIDUAL');

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "rating" "rating" NOT NULL,
    "comment_type" "comment_type" NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);
