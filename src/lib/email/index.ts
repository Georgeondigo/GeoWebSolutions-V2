import { Resend } from "resend";
import type { Inquiry } from "@/generated/prisma/client";
import { buildInquiryEmail } from "./templates/inquiry";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInquiryNotification(inquiry: Inquiry) {
  const notificationEmail = process.env.INQUIRY_NOTIFICATION_EMAIL;
  const fromEmail = process.env.EMAIL_FROM;

  if (!notificationEmail) {
    throw new Error("INQUIRY_NOTIFICATION_EMAIL is not configured.");
  }

  if (!fromEmail) {
    throw new Error("EMAIL_FROM is not configured.");
  }

  const email = buildInquiryEmail(inquiry);

  const result = await resend.emails.send({
    from: fromEmail,
    to: notificationEmail,
    subject: email.subject,
    html: email.html,
    replyTo: inquiry.email,
  });

  if (result.error) {
    throw new Error("Inquiry notification delivery failed.");
  }

  return result;
}
