-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "notificationError" TEXT,
ADD COLUMN     "notificationSentAt" TIMESTAMP(3),
ADD COLUMN     "notificationStatus" "NotificationStatus";
