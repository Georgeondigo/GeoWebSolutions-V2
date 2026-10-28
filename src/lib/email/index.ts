import { Resend } from "resend";
import type { Inquiry } from "@/generated/prisma/client";
import { buildInquiryEmail } from "./templates/inquiry";

// Stored in notificationError with status FAILED; marks a deliberately skipped notification.
export const NOTIFICATION_SUPPRESSED_ERROR =
  "Notification suppressed: hourly notification limit reached.";

export async function sendInquiryNotification(inquiry: Inquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.INQUIRY_NOTIFICATION_EMAIL;
  const fromEmail = process.env.EMAIL_FROM;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!notificationEmail) {
    throw new Error("INQUIRY_NOTIFICATION_EMAIL is not configured.");
  }

  if (!fromEmail) {
    throw new Error("EMAIL_FROM is not configured.");
  }

  const email = buildInquiryEmail(inquiry);

  // Created per call so a missing key fails here (inquiry marked FAILED) instead of at module load.
  const resend = new Resend(apiKey);

  const result = await resend.emails.send({
    from: fromEmail,
    to: notificationEmail,
    subject: email.subject,
    html: email.html,
    replyTo: inquiry.email,
  });

  if (result.error) {
  console.error("Resend email error:", result.error);

  throw new Error(
    `Inquiry notification delivery failed: ${result.error.message}`,
  );
}

  return result;
}
