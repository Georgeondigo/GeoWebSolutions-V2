import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell GeoWeb Solutions about your business problem, project or digital solution.",
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
                Start a project
              </p>

              <h1 className="font-display mt-5 text-5xl font-normal leading-[1.05] tracking-[-0.03em] text-geoweb-text sm:text-6xl lg:text-7xl">
                Let&apos;s build something useful.
              </h1>

              <p className="mt-8 max-w-lg text-lg leading-8 text-geoweb-text/65">
                Tell us what you&apos;re trying to achieve, what problem you&apos;re
                facing or what you&apos;d like to build. You don&apos;t need to have
                the solution figured out yet.
              </p>

              <div className="mt-10 border-t border-geoweb-indigo/10 pt-6">
                <p className="text-sm font-semibold text-geoweb-text">
                  What happens next?
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-geoweb-text/55">
                  We&apos;ll review your inquiry, understand the problem and
                  determine the most practical next step.
                </p>
              </div>
            </div>

            <ContactForm />
          </div>
        </Container>
      </section>

      {/* Other contact options */}
      <section className="bg-geoweb-gray py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-geoweb-red">
                Email
              </p>

              <a
                href="mailto:hello@geowebsolutions.co.ke"
                className="mt-3 inline-block text-base text-geoweb-text transition-colors hover:text-geoweb-red"
              >
                hello@geowebsolutions.co.ke
              </a>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-geoweb-red">
                Services
              </p>

              <Link
                href="/services"
                className="mt-3 inline-block text-base text-geoweb-text transition-colors hover:text-geoweb-red"
              >
                Explore our services →
              </Link>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-geoweb-red">
                Work
              </p>

              <Link
                href="/work"
                className="mt-3 inline-block text-base text-geoweb-text transition-colors hover:text-geoweb-red"
              >
                View selected work →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}