import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

const navigation = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-geoweb-indigo text-white">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/images/brand/geoweb-logo-light.png"
                alt="GeoWeb Solutions"
                width={220}
                height={100}
                className="h-12 w-auto"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
              Digital solutions built around your business.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Explore
            </h2>

            <nav className="mt-4 flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Let&apos;s build
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/70">
              Have a business problem that needs a digital solution?
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-block text-sm font-semibold text-white underline underline-offset-4"
            >
              Start a project →
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-sm text-white/50">
          © {new Date().getFullYear()} GeoWeb Solutions. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
