import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="border-b border-geoweb-indigo/10 bg-white">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/brand/geoweb-logo.png"
              alt="GeoWeb Solutions"
              width={220}
              height={100}
              priority
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-geoweb-text/70 transition-colors hover:text-geoweb-red"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button href="/contact">Start a project</Button>
            </div>

            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
