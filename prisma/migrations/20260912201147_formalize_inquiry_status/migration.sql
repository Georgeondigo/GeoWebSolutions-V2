/*
  Warnings:

  - The `status` column on the `Inquiry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'REVIEWED', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "status",
ADD COLUMN     "status" "InquiryStatus" NOT NULL DEFAULT 'NEW';
