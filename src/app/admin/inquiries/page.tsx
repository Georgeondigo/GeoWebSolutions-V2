import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const projectTypeLabels: Record<string, string> = {
  "business-website": "Business website",
  "web-application": "Web application",
  "business-system": "Business system",
  "e-commerce": "E-commerce",
  "website-redesign": "Website redesign",
  "digital-growth": "Digital growth",
  "not-sure": "Not sure yet",
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

export default async function InquiriesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  const inquiries = await prisma.inquiry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-geoweb-red">
            Inquiries
          </p>

          <h1 className="font-display text-4xl text-geoweb-indigo">
            Project inquiries
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-geoweb-text/70">
            Review potential projects submitted through the GeoWeb website and
            move them through the inquiry lifecycle.
          </p>
        </div>

        {inquiries.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <h2 className="font-display text-2xl text-geoweb-indigo">
              No inquiries yet
            </h2>

            <p className="mt-3 text-sm text-geoweb-text/60">
              New project inquiries will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="border-b border-geoweb-indigo/10 bg-geoweb-gray/50">
                  <tr className="text-xs font-semibold uppercase tracking-wider text-geoweb-text/50">
                    <th className="px-6 py-4">Inquiry</th>
                    <th className="px-6 py-4">Project</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Notification</th>
                    <th className="px-6 py-4">Received</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-geoweb-indigo/10">
                  {inquiries.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className="transition-colors hover:bg-geoweb-gray/30"
                    >
                      <td className="px-6 py-5">
                        <a
                          href={`/admin/inquiries/${inquiry.id}`}
                          className="group block"
                        >
                          <p className="font-semibold text-geoweb-indigo group-hover:text-geoweb-red">
                            {inquiry.name}
                          </p>

                          <p className="mt-1 text-sm text-geoweb-text/60">
                            {inquiry.business || inquiry.email}
                          </p>
                        </a>
                      </td>

                      <td className="px-6 py-5 text-sm text-geoweb-text">
                        {projectTypeLabels[inquiry.projectType] ??
                          inquiry.projectType}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            statusStyles[inquiry.status] ??
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm">
                        <span
                          className={
                            inquiry.notificationStatus === "SENT"
                              ? "text-emerald-700"
                              : inquiry.notificationStatus === "FAILED"
                                ? "text-red-700"
                                : "text-geoweb-text/50"
                          }
                        >
                          {inquiry.notificationStatus ?? "—"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-sm text-geoweb-text/60">
                        {new Intl.DateTimeFormat("en-KE", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(inquiry.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}