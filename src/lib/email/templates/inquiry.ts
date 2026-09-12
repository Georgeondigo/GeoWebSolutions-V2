import type { Inquiry } from "@/generated/prisma/client";

const projectTypeLabels: Record<string, string> = {
  "business-website": "Business website",
  "web-application": "Web application",
  "business-system": "Business system",
  "e-commerce": "E-commerce",
  "website-redesign": "Website redesign",
  "digital-growth": "Digital growth",
  "not-sure": "Not sure yet",
};

const budgetLabels: Record<string, string> = {
  "under-50k": "Under KES 50,000",
  "50k-100k": "KES 50,000 – 100,000",
  "100k-250k": "KES 100,000 – 250,000",
  "250k-plus": "KES 250,000+",
  "not-sure": "Not sure yet",
};

const timelineLabels: Record<string, string> = {
  asap: "As soon as possible",
  "1-month": "Within 1 month",
  "1-3-months": "1–3 months",
  "3-plus-months": "3+ months",
  flexible: "I'm flexible",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function buildInquiryEmail(inquiry: Inquiry) {
  const projectType =
    projectTypeLabels[inquiry.projectType] ?? inquiry.projectType;

  const budget = inquiry.budget
    ? budgetLabels[inquiry.budget] ?? inquiry.budget
    : "Not provided";

  const timeline = inquiry.timeline
    ? timelineLabels[inquiry.timeline] ?? inquiry.timeline
    : "Not provided";

  const business = inquiry.business || "Not provided";

  return {
    subject: `New project inquiry — ${projectType}`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #0F2147;">
        <h1 style="margin-bottom: 8px;">New project inquiry</h1>

        <p style="margin-top: 0; color: #555;">
          A new inquiry has been submitted through the GeoWeb Solutions website.
        </p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 24px 0;" />

        <h2>Contact</h2>

        <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
        <p><strong>Business:</strong> ${escapeHtml(business)}</p>
        <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>

        <h2>Project</h2>

        <p><strong>Type:</strong> ${escapeHtml(projectType)}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget)}</p>
        <p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>

        <h2>Message</h2>

        <div style="background: #F3F4F6; padding: 16px; border-radius: 8px; white-space: pre-wrap;">
          ${escapeHtml(inquiry.message)}
        </div>

        <h2>Inquiry details</h2>

        <p><strong>ID:</strong> ${escapeHtml(inquiry.id)}</p>
        <p><strong>Status:</strong> ${escapeHtml(inquiry.status)}</p>
        <p><strong>Received:</strong> ${escapeHtml(inquiry.createdAt.toISOString())}</p>
      </div>
    `,
  };
}