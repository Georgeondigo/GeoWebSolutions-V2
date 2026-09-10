import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

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
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-geoweb-indigo"
          >
            GeoWeb
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

          <div className="hidden md:block">
            <Button href="/contact">Start a project</Button>
          </div>
        </div>
      </Container>
    </header>
  );
}