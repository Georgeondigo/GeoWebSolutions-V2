import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore GeoWeb Solutions' digital experiences, digital products and digital growth services.",
};

export default function ServicesPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              Our services
            </p>

            <h1 className="font-display mt-5 text-5xl font-normal leading-[1.05] tracking-[-0.03em] text-geoweb-text sm:text-6xl lg:text-7xl">
              Digital solutions built around what your business needs.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-geoweb-text/65 sm:text-xl">
              From professional websites to custom business systems and
              ongoing digital growth, we build solutions around real business
              problems.
            </p>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-geoweb-gray">
        {services.map((service) => (
          <article
            key={service.number}
            className="border-t border-geoweb-indigo/10 py-20 sm:py-28"
          >
            <Container>
              <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
                {/* Service heading */}
                <div>
                  <span className="text-sm font-semibold text-geoweb-red">
                    {service.number}
                  </span>

                  <h2 className="font-display mt-5 text-4xl font-normal tracking-tight text-geoweb-text sm:text-5xl">
                    {service.title}
                  </h2>

                  <p className="mt-6 max-w-md text-base leading-7 text-geoweb-text/65">
                    {service.description}
                  </p>
                </div>

                {/* Service details */}
                <div>
                  <p className="max-w-2xl text-lg leading-8 text-geoweb-text/75">
                    {service.intro}
                  </p>

                  {/* What we can build */}
                  <div className="mt-10">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-geoweb-text">
                      What we can build
                    </h3>

                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="border-b border-geoweb-indigo/10 py-3 text-base text-geoweb-text/70"
                        >
                          <span className="mr-3 text-geoweb-red">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal for */}
                  <div className="mt-10">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-geoweb-text">
                      Ideal for
                    </h3>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.idealFor.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-geoweb-indigo/10 px-4 py-2 text-sm text-geoweb-text/60"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
              Not sure what you need?
            </p>

            <h2 className="font-display mt-5 text-4xl font-normal leading-tight tracking-tight text-geoweb-text sm:text-5xl">
              Start with the problem. We&apos;ll help define the solution.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-geoweb-text/65">
              You don&apos;t need to know exactly what technology or product
              you need. Tell us what you&apos;re trying to achieve and we&apos;ll
              help translate the problem into a practical digital solution.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-full bg-geoweb-red px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-geoweb-indigo"
            >
              Start a project →
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}