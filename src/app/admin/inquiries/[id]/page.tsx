import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import StatusControls from "./StatusControls";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

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
  flexible: "Flexible",
};

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700",
  REVIEWED: "bg-purple-50 text-purple-700",
  CONTACTED: "bg-yellow-50 text-yellow-700",
  QUALIFIED: "bg-emerald-50 text-emerald-700",
  PROPOSAL: "bg-orange-50 text-orange-700",
  WON: "bg-green-50 text-green-700",
  LOST: "bg-red-50 text-red-700",
  ARCHIVED: "bg-gray-100 text-gray-600",
};

const nextStatuses: Record<string, { value: string; label: string }[]> = {
  NEW: [
    { value: "REVIEWED", label: "Mark as reviewed" },
    { value: "ARCHIVED", label: "Archive inquiry" },
  ],
  REVIEWED: [
    { value: "CONTACTED", label: "Mark as contacted" },
    { value: "ARCHIVED", label: "Archive inquiry" },
  ],
  CONTACTED: [
    { value: "QUALIFIED", label: "Mark as qualified" },
    { value: "ARCHIVED", label: "Archive inquiry" },
  ],
  QUALIFIED: [
    { value: "PROPOSAL", label: "Move to proposal" },
    { value: "LOST", label: "Mark as lost" },
    { value: "ARCHIVED", label: "Archive inquiry" },
  ],
  PROPOSAL: [
    { value: "WON", label: "Mark as won" },
    { value: "LOST", label: "Mark as lost" },
    { value: "ARCHIVED", label: "Archive inquiry" },
  ],
  WON: [{ value: "ARCHIVED", label: "Archive inquiry" }],
  LOST: [{ value: "ARCHIVED", label: "Archive inquiry" }],
  ARCHIVED: [],
};

interface InquiryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function InquiryDetailPage({
  params,
}: InquiryDetailPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
  });

  if (!inquiry) {
    notFound();
  }

  const projectType =
    projectTypeLabels[inquiry.projectType] ?? inquiry.projectType;

  const budget = inquiry.budget
    ? (budgetLabels[inquiry.budget] ?? inquiry.budget)
    : "Not specified";

  const timeline = inquiry.timeline
    ? (timelineLabels[inquiry.timeline] ?? inquiry.timeline)
    : "Not specified";

  const actions = nextStatuses[inquiry.status] ?? [];

  return (
    <main className="px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href="/admin/inquiries"
            className="text-sm font-medium text-geoweb-text/60 transition-colors hover:text-geoweb-red"
          >
            ← Back to inquiries
          </Link>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-geoweb-red">
              Project inquiry
            </p>

            <h1 className="font-display text-4xl text-geoweb-indigo">
              {inquiry.name}
            </h1>

            <p className="mt-2 text-sm text-geoweb-text/60">
              Received{" "}
              {new Intl.DateTimeFormat("en-KE", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(inquiry.createdAt)}
            </p>
          </div>

          <span
            className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${
              statusStyles[inquiry.status] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {inquiry.status}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-geoweb-red">
                Contact
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-geoweb-text/40">
                    Name
                  </p>
                  <p className="mt-1 text-sm text-geoweb-text">
                    {inquiry.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-geoweb-text/40">
                    Business
                  </p>
                  <p className="mt-1 text-sm text-geoweb-text">
                    {inquiry.business || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-geoweb-text/40">
                    Email
                  </p>
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="mt-1 block text-sm text-geoweb-red hover:underline"
                  >
                    {inquiry.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-geoweb-red">
                Project
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-geoweb-text/40">
                    Project type
                  </p>
                  <p className="mt-1 text-sm text-geoweb-text">{projectType}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-geoweb-text/40">
                    Budget
                  </p>
                  <p className="mt-1 text-sm text-geoweb-text">{budget}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-geoweb-text/40">
                    Timeline
                  </p>
                  <p className="mt-1 text-sm text-geoweb-text">{timeline}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-geoweb-red">
                Message
              </p>

              <p className="whitespace-pre-wrap text-sm leading-7 text-geoweb-text/80">
                {inquiry.message}
              </p>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-geoweb-red">
                Notification
              </p>

              <p className="text-sm font-semibold text-geoweb-indigo">
                {inquiry.notificationStatus ?? "Not tracked"}
              </p>

              {inquiry.notificationSentAt && (
                <p className="mt-2 text-xs leading-5 text-geoweb-text/50">
                  Sent{" "}
                  {new Intl.DateTimeFormat("en-KE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(inquiry.notificationSentAt)}
                </p>
              )}

              {inquiry.notificationError && (
                <p className="mt-3 rounded-2xl bg-red-50 p-3 text-xs leading-5 text-red-700">
                  {inquiry.notificationError}
                </p>
              )}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-geoweb-red">
                Move inquiry
              </p>

              <StatusControls inquiryId={inquiry.id} actions={actions} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
