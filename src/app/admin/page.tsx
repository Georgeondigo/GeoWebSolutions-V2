import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-geoweb-gray px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-geoweb-red">
            GeoWeb Admin
          </p>

          <h1 className="font-display text-4xl text-geoweb-indigo">
            Dashboard
          </h1>

          <p className="mt-3 text-geoweb-text/70">
            Welcome back, {session.user.name ?? "GeoWeb Admin"}.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/inquiries"
            className="rounded-3xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm font-semibold text-geoweb-red">
              Inquiries
            </p>

            <h2 className="mt-2 font-display text-2xl text-geoweb-indigo">
              Manage inquiries
            </h2>

            <p className="mt-3 text-sm leading-6 text-geoweb-text/70">
              Review and manage project inquiries submitted through the
              GeoWeb website.
            </p>
          </Link>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-geoweb-red">
              Operations
            </p>

            <h2 className="mt-2 font-display text-2xl text-geoweb-indigo">
              Internal operations
            </h2>

            <p className="mt-3 text-sm leading-6 text-geoweb-text/70">
              Internal business operations will be added here as GeoWeb
              evolves.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-geoweb-red">
              Account
            </p>

            <h2 className="mt-2 font-display text-2xl text-geoweb-indigo">
              Admin access
            </h2>

            <p className="mt-3 text-sm leading-6 text-geoweb-text/70">
              Signed in as {session.user.email}.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}