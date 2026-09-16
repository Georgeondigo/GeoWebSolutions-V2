import Link from "next/link";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-geoweb-gray">
      <header className="border-b border-geoweb-indigo/10 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div>
            <p className="font-display text-lg text-geoweb-indigo">
              GeoWeb Admin
            </p>
            <p className="text-xs text-geoweb-text/50">Internal operations</p>
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium text-geoweb-text">
            <Link
              href="/admin"
              className="transition-colors hover:text-geoweb-red"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/inquiries"
              className="transition-colors hover:text-geoweb-red"
            >
              Inquiries
            </Link>
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}
